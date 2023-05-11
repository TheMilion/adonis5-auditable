import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'audits'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('auditable_id').index()
      table.string('auditable').notNullable().index()
      table.string('event').notNullable().index()
      table.string('ip', 45).notNullable().index()
      table.text('url').notNullable().index()
      table.text('old_data', 'longtext')
      table.text('new_data', 'longtext')
      table.dateTime('created_at')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
