import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reaction from 'App/Models/Reaction'
import Post from 'App/Models/Post'

export default class ReactionsController {
  public async index({ response }: HttpContextContract) {
    try {
      const like = await Reaction.query().preload('user')
      return response.withSuccess(`found ${like.length} likes`, like)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user
      const postId = request.qs().post_id
      const reactionType = request.qs().reaction_type
      const post = await Post.query().where({ id: postId }).first()

      const like = await Reaction.create({
        user_id: user?.id,
        post_id: post?.id,
        reaction_type: reactionType,
      })
      if (like) {
        await Post.query().where({ id: postId }).increment('like', 1)
      }

      return response.withSuccess(`liking post with id: ${post?.id} success`, like)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const like = await Reaction.query().preload('user').where('post_id', id)
      return response.withSuccess(`found ${like.length} likes`, like)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  // public async update({}: HttpContextContract) {}

  public async destroy({ params: { id }, response, auth }: HttpContextContract) {
    try {
      const user = auth.user

      const like = await Reaction.query().where({ id: id }).first()
      if (like?.user_id === user?.id) {
        await like?.delete()
        await Post.query().where({ id: like?.post_id }).decrement('like', 1)
        return response.withSuccess(
          `Unlike successfully in ${like?.post_id} by ${user?.name}`,
          like
        )
      }
      return response.json({
        success: false,
        message: `${user?.name} doesn't have access to delete likes.`,
      })
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
