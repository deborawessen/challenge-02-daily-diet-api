import { randomUUID } from 'crypto';
import { FastifyInstance, FastifyRequest ,FastifyReply} from 'fastify';
import { z } from 'zod';
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists';

export async function mealsRoutes(app:FastifyInstance) {

    app.post('/', {
        preHandler: [checkSessionIdExists]
    } ,async (request: FastifyRequest, reply: FastifyReply) => {
        
        const { sessionId } = request.cookies

        const userId = await knex('users').where('session_id',sessionId).select('id').first()

        const createMealsBodySchema = z.object({
            name: z.string(),
            description: z.string(),
            date: z.string(),
            time: z.string(),
            isOnDiet: z.boolean(),

        })

        const { name, description, date, time, isOnDiet } = createMealsBodySchema.parse(request.body)

        await knex('meals').insert({
            id: randomUUID(),
            user_id: userId.id,
            name,
            description,
            date,
            time,
            isOnDiet,
            session_id: sessionId

        })
        return reply.status(201).send('Created meal')
    })

    app.put('/:id',
        {
            preHandler: [checkSessionIdExists]
        },async (request: FastifyRequest, reply: FastifyReply) => {

            const updateMealParamsSchema = z.object({
                id:z.string().uuid(),
            })

            const { id } = updateMealParamsSchema.parse(request.params)
            
            const updateMealBodySchema = z.object({
                name: z.string(),
                description: z.string(),
                date: z.string(),
                time: z.string(),
                isOnDiet: z.boolean(),
            })

            const { name, description, date, time, isOnDiet} = updateMealBodySchema.parse(request.body)

            await knex('meals').where('id',id)
            .update({
                name,
                description,
                date,
                time,
                isOnDiet
            })

            return reply.status(201).send('Meal updated')
        })

        app.delete('/:id',
            {
                preHandler: [checkSessionIdExists]
            }, async (request: FastifyRequest) => {
                
                const deleteMealParamsScheme = z.object({
                    id: z.string().uuid(),
                })

                const { id } = deleteMealParamsScheme.parse(request.params)

                await knex('meals').where('id', id).delete()
            
                

        })

        app.get('/', {
            preHandler: [checkSessionIdExists]
        } ,async (request: FastifyRequest) => {
    
            const { sessionId } = request.cookies
    
            const userId = await knex('users').where('session_id',sessionId).select('id').first()
    
            const meals = await knex('meals')
                .where('user_id', userId.id).select()
            
            return {
                meals
            }
        })

        app.get('/:id',{
                preHandler: [checkSessionIdExists]
            },
            async (request: FastifyRequest) => {
                
                const getMealParamsSchema = z.object({
                    id: z.string().uuid()
                })

                const { id } = getMealParamsSchema.parse(request.params)

                const meal = await knex('meals').where('id', id).select().first()

                return {
                    meal
                }
           })

           app.get('/metrics',
            {
                preHandler: [checkSessionIdExists]
            },
           async (request:FastifyRequest) => {
                
                const { sessionId } = request.cookies

                const userId = await knex('users').where('session_id',sessionId).select('id').first()

                const listMealsOrderByDate = await knex('meals')
                .where('user_id',userId.id).orderBy('date', 'desc')

                const totalMeals = listMealsOrderByDate.length

                const totalMealsOnDiet = listMealsOrderByDate.filter(element => element.isOnDiet).length

                const totalMealsOffDiet = listMealsOrderByDate.filter(element => !element.isOnDiet).length


                let temp = 0
                let maxOfSequence = 0
                listMealsOrderByDate.forEach(object => {
                    if(object.isOnDiet){
                        temp ++
                    }else{
                        if(maxOfSequence < temp){
                            maxOfSequence = temp
                            temp = 0
                        }
                    }
                  });

                return {
                    totalMeals,
                    totalMealsOnDiet,
                    totalMealsOffDiet,
                    maxOfSequence
                }
           })
           
    
}