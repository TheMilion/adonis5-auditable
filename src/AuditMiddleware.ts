import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import HttpContext from 'App/Helpers/HttpContext'

export default class AuditMiddleware {
    public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
        HttpContext.setContext(ctx)
        await next()
    }
}