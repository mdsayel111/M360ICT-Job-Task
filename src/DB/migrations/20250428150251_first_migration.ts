import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable("authors", function (table) {
      table.increments("id").primary();
      table.string("name", 255).notNullable();
      table.text("bio");
      table.date("birthdate").notNullable();
      table.timestamps(true, true);
    })
    .createTable("books", function (table) {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.text("description");
      table.date("published_date").notNullable();
      table
        .integer("author_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("authors")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("books");
  await knex.schema.dropTableIfExists("authors");
}
