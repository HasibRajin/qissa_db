import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reaction from 'App/Models/Reaction'
import CreateReaction from 'App/Validators/StoreReactionRequestValidator'

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
      const payload = await request.validate(CreateReaction)
      const like = await Reaction.create({
        user_id: user?.id,
        post_id: payload.post_id,
        reaction_type: payload.reaction_type,
      })

      return response.withSuccess(`liking post with id: ${like?.post_id} success`, like)
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

  public async update({ params: { id }, response, request, bouncer }: HttpContextContract) {
    try {
      const userReaction = await Reaction.findOrFail(id)
      await bouncer.authorize('userReaction', userReaction)
      const reactionType = request.only(['reaction_type'])
      userReaction?.merge(reactionType)
      const reaction = await userReaction?.save()
      return response.withSuccess('update success', reaction)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, bouncer, auth }: HttpContextContract) {
    try {
      const reaction = await Reaction.query()
        .where({ user_id: auth.user?.id })
        .andWhere({ post_id: id })
        .first()

      // const reaction = await Reaction.findOrFail(reactionData.id)
      // @ts-ignore
      await bouncer.authorize('userReaction', reaction)

      await reaction?.delete()
      return response.withSuccess(`Unlike successfully`, reaction)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
