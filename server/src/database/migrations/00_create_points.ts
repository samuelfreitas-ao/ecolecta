import Knex from 'knex';

export async function up(knex: Knex){
    return knex.schema.createTable('tb_points', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('image').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        table.string('province').notNullable();
        table.string('county').notNullable();
        //table.engine('innoDB');
    });
}

export async function down(knex: Knex){
    return knex.schema.dropTable('tb_points');
}