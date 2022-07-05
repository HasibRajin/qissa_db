import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import CreateUser from 'App/Validators/Auth/StoreUserRequest'
import Login from 'App/Validators/Auth/LoginUserRequest'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.query().preload('profile')
      // .preload('posts', (postsQuery) => {
      //   postsQuery.preload('comments', (commentsQuery) => {
      //     commentsQuery.preload('user')
      //   }),
      //     postsQuery.preload('reactions', (likesQuery) => {
      //       likesQuery.preload('user')
      //     })
      // })

      return response.withSuccess(`Found ${users.length} users`, users)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const userData = await request.validate(CreateUser)
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        is_active: false,
        // @ts-ignore
        profile_pic: null,
      })
      // await Mail.send((message) => {
      //   message.from('md.hasibul.hasan@g.bracu.ac.bd').to(userData.email).text('tyhtyhythn')
      // })
      // user?.sendVerificationEmail()
      // await Event.emit('new:user', { id: user.id, email: user.email, name: user.name })
      await auth.use('api').revoke()
      const token = await auth.use('api').generate(user)
      await user.related('profile').create({ user_id: user.id })
      return response.withSuccess(
        'Registration successful, check your email inbox for a verification email',
        { user, token }
      )
      // return response.json({
      //   success: true,
      //   message: 'Registration successful, check your email inbox for a verification email',
      //   token,
      //   user,
      // })
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const requestData = await request.validate(Login)

      const token = await auth.use('api').attempt(requestData.email, requestData.password)
      const user = await auth.user
      return response.withSuccess('login success', { user, token })
      // return response.json({
      //   success: true,
      //   message: 'user creation success',
      //   token: token,
      //   user: user,
      // })
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      const user = auth.user?.name
      await auth.use('api').revoke()
      return response.withSuccess('logout successfully', user)
    } catch (e) {
      return response.json({ success: false, message: e.message })
    }
  }
  public async show({ request, response, params: { id } }: HttpContextContract) {
    try {
      const followerId = request.qs().follower_id
      if (followerId) {
        const user = await User.query()
          .where('id', id)
          .preload('profile')
          .preload('follower', (followerQuery) => {
            followerQuery.where('relatable_id', followerId)
          })
          .withCount('follower')

        return response.withSuccess(`found user`, user)
      }
      const user = await User.query().where('id', id).preload('profile').withCount('follower')
      return response.withSuccess(`found user`, user)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
