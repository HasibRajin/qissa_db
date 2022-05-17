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
      const comment = await Comment.query().where({ post_id: id }).preload('user')
      return response.withSuccess(`found ${comment?.length} likes`, comment)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, response, request, auth }: HttpContextContract) {
    try {
      const user = auth.user
      const comment = await Comment.query().where({ id: id }).first()
      if (comment?.user_id === user?.id) {
        const commentData = request.only(['comment_text'])
        await comment?.merge(commentData)
        const userComment = await comment?.save()
        return response.withSuccess(`comment of ${user?.name} is updated successfully`, userComment)
      }
      return response.json({
        success: false,
        message: `${user?.name} don't have access to update this post.`,
      })
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, auth }: HttpContextContract) {
    try {
      const user = auth.user

      const comment = await Comment.query().where({ id: id }).first()
      if (comment?.user_id === user?.id) {
        await comment?.delete()
        return response.withSuccess(
          `post of ${user?.name} with ${comment?.id} is deleted successfully`,
          comment
        )
      }
      return response.json({
        success: false,
        message: `${user?.name} don't have access to delete this comments.`,
      })
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
