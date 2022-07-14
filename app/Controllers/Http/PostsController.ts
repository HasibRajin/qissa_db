import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePost from 'App/Validators/Post/StorePostRequest'

export default class PostsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const likerId = request.qs().liker_id
      if (likerId) {
        const post = await Post.query()
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

      // console.log(post.toJSON())
      // return response.send(post.toJSON())

      return response.withSuccess(`Found ${post.length} posts`, post)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const user = auth.user
      const postData = await request.validate(CreatePost)

      const post = await Post.create({
        user_id: user?.id,
        topic_id: postData.topic_id,
        title: postData.title,
        details: postData.details,
        image: postData.image,
      })
      // await Event.emit('new:post', {
      //   id: post.id,
      //   userID: post.user_id,
      //   message: 'A new post has uploaded.',
      // })
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
      const likerId = request.qs().liker_id
      if (likerId) {
        const post = await Post.query()
          .where({ user_id: id })
          .preload('reactions', (reactionsQuery) => {
            reactionsQuery.where('user_id', likerId)
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
        .where({ user_id: id })
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

  public async update({ params: { id }, response, request, bouncer }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(id)
      await bouncer.authorize('userPost', post)

      const postData = request.only(['title', 'details', 'image'])
      post?.merge(postData)
      const userPost = await post?.save()

      return response.withSuccess(`post is updated successfully`, userPost)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, bouncer }: HttpContextContract) {
    try {
      const post = await Post.findOrFail(id)
      await bouncer.authorize('userPost', post)
      await post?.delete()
      return response.withSuccess(`post is deleted successfully`, post)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
