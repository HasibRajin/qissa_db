import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import User from 'App/Models/User'
import Topic from 'App/Models/Topic'
import Question from 'App/Models/Question'

export default class SearchesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const likerId = request.qs().liker_id
      const requestData = request.qs().request_data
      let post

      if (likerId) {
        post = await Post.query()
          .where('title', 'Ilike', `%${requestData}%`)
          .orWhere('details', 'like', `%${requestData}%`)
          .preload('user')
          .preload('reactions', (reactionQuery) => {
            reactionQuery.where('user_id', likerId)
          })
          .withCount('reactions')
          .withCount('comments')
      } else {
        post = await Post.query()
          .where('title', 'Ilike', `%${requestData}%`)
          .orWhere('details', 'like', `%${requestData}%`)
          .preload('user')
          .withCount('reactions')
          .withCount('comments')
      }
      const topic = await Topic.query().where('name', 'Ilike', `%${requestData}%`)
      const user = await User.query()
        .where('name', 'Ilike', `%${requestData}%`)
        .orWhere('email', 'Ilike', `%${requestData}%`)
      return response.withSuccess(`Found result`, { post, user, topic })
    } catch (e) {
      return response.withError(e.message)
    }
  }
  public async searchWithUser({ request, response }: HttpContextContract) {
    try {
      const requestData = request.qs().request_data

      const user = User.query()
        .where('name', 'like', `%${requestData}%`)
        .orWhere('email', 'like', `%${requestData}%`)

      return response.withSuccess(` found user`, user)
    } catch (e) {
      return response.withError(e.message)
    }
  }
  public async searchQuestionWithTopic({ request, response }: HttpContextContract) {
    try {
      const requestData = request.qs().request_data
      const topic = Topic.query().where('name', 'like', `%${requestData}%`)
      return response.withSuccess(` found posts`, topic)
    } catch (e) {
      return response.withError(e.message)
    }
  }
  public async searchQuestion({ request, response }: HttpContextContract) {
    try {
      const requestData = request.qs().request_data
      const question = Question.query().where('title', 'Ilike', `%${requestData}%`)
      return response.withSuccess(` found posts`, question)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
