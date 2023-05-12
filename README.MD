Audit models in AdonisJS 5

How to use
Install npm module:

> $ npm install adonis5-auditable

## `Register Config in App.ts`

Once you have installed adonis5-auditable, make sure to set in ServerConfig config/app.ts in order to make use of it.

```js 
export const http: ServerConfig = {
  useAsyncLocalStorage: true,
}
```

## `Start migrations`

Once you have installed adonis5-auditable, make sure to start migrations in order to make use of it.

> $ node ace migration:run


Using the module:
Add the following to your model's boot method:

export default class MyModel `extends AuditModel` {
}

`Remember that the audit automatically creates the migration pointing to the "users" table with reference to its "id"`.


> Example with id

```js 
table.integer('user_id').unsigned().references('id').inTable('users')
```

> Example with uuid 
 
```js 
table.uuid('user_uuid').unsigned().references('id').inTable('users')
```

In case you need to change the values. Before starting the migration, modify the file audit_migrations present in database/migrations according to your needs.

The same goes for the reference of the selected auth model into the AuditModel. `It automatically points to the "auth.user.id" value`

> Example with id

```js
await Audit.create({
    event: 'delete',
    user_id: auth && auth.user ? auth.user.id : null,
    url: url,
    auditable: model.constructor.name,
    auditable_id: primaryKeyValue,
    ip: ipAddress,
    old_data: JSON.stringify(originalData),
    new_data: '',
})
```

> Example with uuid

```js
await Audit.create({
    event: 'delete',
    user_uuid: auth && auth.user ? auth.user.uuid : null,
    url: url,
    auditable: model.constructor.name,
    auditable_id: primaryKeyValue,
    ip: ipAddress,
    old_data: JSON.stringify(originalData),
    new_data: '',
})
```

In case you need to change the values. Go into the AuditModel model and change the values in the @afterCreate @beforeUpdate @beforeDelete decorators



