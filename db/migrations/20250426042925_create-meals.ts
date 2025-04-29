import type { Knex } from "knex";


118

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('meals', (table) => {
        table.uuid('id').primary()
        table.uuid('user_id').notNullable()
        table.text('name').notNullable()
        table.text('description').notNullable()
        table.date('date').notNullable()
        table.time('time').notNullable()
        table.boolean('isOnDiet').notNullable()
        table.uuid('session_id').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('meals')
}


