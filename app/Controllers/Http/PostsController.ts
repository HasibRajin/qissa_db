import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePost from 'App/Validators/Post/StorePostRequest'

export default class PostsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const id = request.qs().id
      if (id) {
        const post = await Post.query()
          .preload('reactions', (reactionQuery) => {
            reactionQuery.where('user_id', id)
          })
          .preload('comments')
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
        .preload('comments')
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

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id
      const postData = await request.validate(CreatePost)

      const post = await Post.create({
        user_id: userId,
        topic_id: postData.topic_id,
        title: postData.title,
        details: postData.details,
        like: 0,
        image: postData.image,
      })
      return response.withSuccess('post creation success', post)
    } catch (e) {
      if (e.messages) {
        return response.withError(e.messages)
      }
      return response.withError(e.message)
    }
  }

  public async show({ params: { id }, response, request }: HttpContextContract) {
    try {
      const likerId = request.qs().id
      if (id) {
        const post = await Post.query()
          .where({ user_id: id })
          .preload('reactions', (reactionsQuery) => {
            reactionsQuery.where('user_id', likerId)
          })
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
        .where({ user_id: id })
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

  public async update({ params: { id }, response, request, auth }: HttpContextContract) {
    try {
      const user = auth.user

      const post = await Post.query().where({ id: id }).first()
      if (post?.user_id === user?.id) {
        const postData = request.only(['title', 'details', 'image'])
        post?.merge(postData)
        const userPost = await post?.save()

        return response.withSuccess(`post of ${user?.name} is updated successfully`, userPost)
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

      const post = await Post.query().where({ id: id }).first()
      if (post?.user_id === user?.id) {
        await post?.delete()
        return response.withSuccess(
          `post of ${user?.name} with ${post?.id} is deleted successfully`,
          post
        )
      }
      return response.json({
        success: false,
        message: `${user?.name} don't have access to delete this post.`,
      })
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
