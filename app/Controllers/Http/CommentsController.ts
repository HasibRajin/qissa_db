import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import CreateComment from 'App/Validators/Comment/StoreCommentRequest'

export default class CommentsController {
  public async index({}: HttpContextContract) {
    return await Comment.all()
  }

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id
      const commentData = await request.validate(CreateComment)
      const comment = await Comment.create({
        user_id: userId,
        post_id: commentData.post_id,
        comment_text: commentData.comment_text,
      })
      return response.withSuccess('comment creation success', comment)
    } catch (e) {
      if (e.messages) {
        return response.withError(e.messages)
      }
      return response.withError(e.message)
    }
  }

  public async show({ response, params: { id } }: HttpContextContract) {
    try {
      const comment = await Comment.query()
        .where({ post_id: id })
        .preload('user')
        .orderBy([
          {
            column: 'created_at',
            order: 'desc',
          },
        ])
      return response.withSuccess(`found ${comment?.length} likes`, comment)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, response, request, bouncer }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(id)
      await bouncer.authorize('userComment', comment)
      const commentData = request.only(['comment_text'])
      comment?.merge(commentData)
      const userComment = await comment?.save()
      return response.withSuccess(`comment is updated successfully`, userComment)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, bouncer }: HttpContextContract) {
    try {
      const comment = await Comment.findOrFail(id)
      await bouncer.authorize('userComment', comment)

      await comment?.delete()
      return response.withSuccess(`post with ${comment?.id} is deleted successfully`, comment)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
