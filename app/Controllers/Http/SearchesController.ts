import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Post from 'App/Models/Post'
import User from 'App/Models/User'
import Topic from 'App/Models/Topic'

export default class SearchesController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const likerId = request.qs().liker_id
      const requestData = request.qs().request_data
      let post

      if (likerId) {
        post = await Post.query()
          .where('title', 'like', `%${requestData}%`)
          .orWhere('details', 'like', `%${requestData}%`)
          .preload('user')
          .preload('reactions', (reactionQuery) => {
            reactionQuery.where('user_id', likerId)
          })
          .withCount('reactions')
          .withCount('comments')
          .orderBy([
            {
              column: 'created_at',
              order: 'desc',
            },
          ])
          .paginate(request.qs().current_page, request.qs().limit)
      } else {
        post = await Post.query()
          .where('title', 'like', `%${requestData}%`)
          .orWhere('details', 'like', `%${requestData}%`)
          .preload('user')
          .withCount('reactions')
          .withCount('comments')
          .orderBy([
            {
              column: 'created_at',
              order: 'desc',
            },
          ])
          .paginate(request.qs().current_page, request.qs().limit)
      }
      const topic = await Topic.query().where('name', 'like', `%${requestData}%`)
      const user = await User.query()
        .where('name', 'like', `%${requestData}%`)
        .orWhere('email', 'like', `%${requestData}%`)
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
  public async searchWithTopic({ request, response }: HttpContextContract) {
    try {
      const requestData = request.qs().request_data
      const topic = Topic.query().where('name', 'like', `%${requestData}%`)
      return response.withSuccess(` found posts`, topic)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
