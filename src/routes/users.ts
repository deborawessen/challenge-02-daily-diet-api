import { randomUUID } from "crypto";
import  { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { knex } from '../database';
import { z } from "zod";


export async function usersRoutes(app: FastifyInstance) {
    
    app.post('/',async (request:FastifyRequest, reply: FastifyReply) => {
        
        const createUserBodySchema = z.object({
            name: z.string(),
        })

        const { name } = createUserBodySchema.parse(request.body)

            const sessionId = randomUUID()
            reply.cookie('sessionId', sessionId, {
                path:'/',
                maxAge: 60 * 60 * 24 * 7 // 7 days
              })

        await knex('users')
        .insert({
            id: randomUUID(),
            name,
            session_id: sessionId,
        })

        return reply.status(201).send('Created user')
        
    })

    app.get('/',async () => {

        const users = await knex('users').select()

        return {
            users
        }
    })
    

}