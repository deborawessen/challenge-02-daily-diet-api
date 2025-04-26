import { knex } from 'knex'

declare module 'knex/types/tables' {

    export interface Tables {
        user: {
            id: string,
            name: string,
            session_id?: string
        },
        meals: {
            id: string,
            name: string,
            description: string,
            date: string,
            time: string,
            isOnDiet: boolean,
            session_id: string
        }
    }
}