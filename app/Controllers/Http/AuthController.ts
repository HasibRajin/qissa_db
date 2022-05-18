import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import CreateUser from 'App/Validators/Auth/StoreUserRequest'
import Login from 'App/Validators/Auth/LoginUserRequest'

export default class AuthController {
  public async index({ response }: HttpContextContract) {
    //dsvsv
    try {
      const users = await User.query()
        .preload('profile')
        .preload('posts', (postsQuery) => {
          postsQuery.preload('comments', (commentsQuery) => {
            commentsQuery.preload('user')
          }),
            postsQuery.preload('reactions', (likesQuery) => {
              likesQuery.preload('user')
            })
        })

      return response.withSuccess(`Found ${users.length} users`, users)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  // public async create({}: HttpContextContract) {}

  public async register({ request, response, auth }: HttpContextContract) {
    try {
      const userData = await request.validate(CreateUser)
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        follower_count: 0,
      })
      const token = await auth.use('api').generate(user)
      await user.related('profile').create({ user_id: user.id })
      return response.json({
        success: true,
        message: 'user creation success',
        token: token,
        user: user,
      })
    } catch (e) {
      if (e.messages) {
        return response.withError(e.messages)
      }
      return response.withError(e.message)
    }
  }

  // public async show({request, response,params:{id}}: HttpContextContract) {
  //
  // }
  public async login({ request, response, auth }: HttpContextContract) {
    try {
      const requestData = await request.validate(Login)

      const token = await auth.use('api').attempt(requestData.email, requestData.password)
      const userData = await auth.user

      return response.json({
        success: true,
        message: 'user creation success',
        token: token,
        user: userData,
      })
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async logout({ response, auth }: HttpContextContract) {
    try {
      const user = auth.user?.name
      await auth.use('api').revoke()
      return response.json({
        success: true,
        message: `${user} logout successfully`,
        user,
      })
    } catch (e) {
      return response.json({ success: false, message: e.message })
    }
  }

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
