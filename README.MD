Audit models in AdonisJS 5

How to use
Install npm module:

> $ npm install adonis5-auditable

Register Global middleware 
Once you have installed adonis5-auditable, make sure to register the Global middleware inside start/kernel.ts in order to make use of it.

> Server.middleware.register([ () => import('App/Middleware/AuditMiddleware') ])

Start migrations

Once you have installed adonis5-auditable, make sure to start migrations in order to make use of it.

`Remember that the audit automatically creates the migration pointing to the "users" table with reference to its "id"`.

> Example with id table.integer('user_id').unsigned().references('id').inTable('users')

> Example with uuid table.uuid('user_uuid').unsigned().references('id').inTable('users')

In case you need to change the values. Before starting the migration, modify the data according to your needs.

The same goes for the reference of the selected auth model into the AuditModel. `It automatically points to the "auth.user.id" value`

> Example with id


await Audit.create({
    event: 'delete',
    `user_id: auth && auth.user ? auth.user.id : null`,
    url: url,
    auditable: model.constructor.name,
    auditable_id: primaryKeyValue,
    ip: ipAddress,
    old_data: JSON.stringify(originalData),
    new_data: '',
})

> Example with uuid


await Audit.create({
    event: 'delete',
    `user_uuid: auth && auth.user ? auth.user.uuid : null`,
    url: url,
    auditable: model.constructor.name,
    auditable_id: primaryKeyValue,
    ip: ipAddress,
    old_data: JSON.stringify(originalData),
    new_data: '',
})

In case you need to change the values. Go into the AuditModel model and change the values in the @afterCreate @beforeUpdate @beforeDelete decorators

node ace migration:run


Using the module:
Add the following to your model's boot method:

export default class MyModel extends AuditModel {
}

