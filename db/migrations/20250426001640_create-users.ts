import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.uuid('id').primary()
        table.text('name').notNullable()
        table.uuid('session_id')
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users')
}

