// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'
import Question from 'App/Models/Question'

export default class SearchQAcontollersController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const requestData = request.qs().request_data
      const question = await Question.query().where('title', 'Ilike', `%${requestData}%`)
      return response.withSuccess(` found posts`, question)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async searchQuestionWithTopic({ request, response }: HttpContextContract) {
    try {
      const requestData = request.qs().request_data
      const topic = await Topic.query()
        .where('name', 'Ilike', `%${requestData}%`)
        .preload('questions')
      return response.withSuccess(` found posts`, topic)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
