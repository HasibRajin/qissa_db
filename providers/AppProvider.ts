import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    const Response = this.app.container.use('Adonis/Core/Response')

    const { ModelQueryBuilder } = this.app.container.use('Adonis/Lucid/Database')
    let array: Array<object> = []
    let bacOff = 0
    let i = 0
    ModelQueryBuilder.macro('pagination', async function (current_page, back_off) {
      // eslint-disable-next-line eqeqeq
      array = []
      i = 0
      if (current_page <= 1 || back_off === 0) {
        return await this.paginate(current_page)
      } else {
        bacOff = back_off
        const result1 = await this.paginate(Number.parseInt(current_page, 10) - 1)
        const result2 = await this.paginate(current_page)
        result1.forEach(getPreviousData)
        result2.forEach(addCurrentData)
        return array
      }
    })
    function getPreviousData(item, index, arr) {
      if (index >= arr.length - bacOff) {
        array[i] = item
        i++
      }
    }
    function addCurrentData(item, index, arr) {
      if (index < arr.length - bacOff) {
        array[i] = item
        i++
      }
    }
    Response.macro('withSuccess', function (message, data = undefined, status = 200) {
      let response = { success: true, message }
      if (data !== undefined) {
        response['data'] = data
      }
      this.status(status).json(response)
      return this
    })
    Response.macro('withError', function (message, status = 404) {
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
