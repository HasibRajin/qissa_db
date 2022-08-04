declare module '@ioc:Adonis/Core/Response' {
  interface ResponseContract {
    withSuccess(messages: any, data?: any, status?: any): this

    withError(messages: any, status?: any): this
  }
}
