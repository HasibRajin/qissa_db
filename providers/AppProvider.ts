import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Response = this.app.container.use('Adonis/Core/Response')

    Response.macro('withSuccess', function (message, data = undefined, status = 200) {
      let response = { success: true, message }
      if (data !== undefined) {
        response['data'] = data
      }
      this.status(status).json(response)
      return this
    })
    Response.macro('withError', function (message, status = 200) {
      let response = { success: false, message }
      this.status(status).json(response)
      return this
    })

    const { PostMarkDriver } = await import('./PostMarkDriver')
    const Mail = this.app.container.use('Adonis/Addons/Mail')

    Mail.extend('postmark', (_mail, _mapping, config) => {
      return new PostMarkDriver(config)
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
