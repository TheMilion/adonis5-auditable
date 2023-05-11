Audit models in AdonisJS 5

How to use
Install npm module:

$ npm install adonis5-auditable

Register provider
Once you have installed adonis5-auditable, make sure to register the provider inside start/kernel.ts in order to make use of it.

Server.middleware.register([
  () => import('App/Middleware/AuditMiddleware')
])

Using the module:
Add the following to your model's boot method:

export default class MyModel extends AuditModel {
}
