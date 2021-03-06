import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from 'App/Models/Topic'
import Post from 'App/Models/Post'

export default class TopicsController {
  public async index({ response }: HttpContextContract) {
    const topic = await Topic.query().orderBy([
      {
        column: 'created_at',
        order: 'asc',
      },
    ])
    return response.withSuccess(`Found topics`, topic)
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const topicData = request.only(['name'])
      const topic = await Topic.create(topicData)
      response.withSuccess('topic creation success.', topic)
    } catch (e) {
      response.withError(e.message)
    }
  }

  public async show({ params: { id }, response, request }: HttpContextContract) {
    try {
      const likerId = request.qs().liker_id
      const userId = request.qs().user_id
      if (userId && likerId) {
        const post = await Post.query()
          .where('topic_id', id)
          .andWhere('user_id', userId)
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
        return response.withSuccess(`Found ${post.length} posts`, post)
      } else if (likerId) {
        const post = await Post.query()
          .where('topic_id', id)
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
        return response.withSuccess(`Found ${post.length} posts`, post)
      }
      const post = await Post.query()
        .where('topic_id', id)
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
      return response.withSuccess(`Found ${post.length} posts`, post)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, response, request }: HttpContextContract) {
    try {
      const topic = await Topic.query().where({ id: id }).first()

      const topicData = request.only(['name'])
      topic?.merge(topicData)
      const updateTopic = await topic?.save()

      return response.withSuccess(`topic of ${topic?.id} is updated successfully`, updateTopic)
    } catch (e) {
      response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response }: HttpContextContract) {
    try {
      const topic = await Topic.query().where({ id: id }).first()
      await topic?.delete()
      response.withSuccess('topic deletion success.', topic)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
