import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Claps extends BaseSchema {
  protected tableName = 'claps'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable()
      table
        .integer('answer_id')
        .unsigned()
        .references('id')
        .inTable('answers')
        .onDelete('CASCADE')
        .notNullable()
      table.unique(['user_id', 'answer_id'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
