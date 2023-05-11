import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class HttpContext {
    private static context: HttpContextContract | null = null

    public static setContext(context: HttpContextContract) {
        HttpContext.context = context
    }

    public static getContext(): HttpContextContract | null {
        return HttpContext.context
    }
}