import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import faker from '@faker-js/faker'

export default class SocialLoginController {
  public async index({ params: { drive }, response, ally }: HttpContextContract) {
    try {
      if (drive === 'facebook') {
        return ally.use(drive).redirect((redirectRequest) => {
          redirectRequest.scopes(['email'])
        })
      }
      return ally.use(drive).redirect()
    } catch (e) {
      return response.withError(e.message)
    }
  }
  public async callback({ params: { drive }, response, ally, auth }: HttpContextContract) {
    try {
      const driveName = ally.use(drive)

      /**
       * User has explicitly denied the login request
       */
      if (driveName.accessDenied()) {
        return 'Access was denied'
      }

      /**
       * Unable to verify the CSRF state
       */
      if (driveName.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      /**
       * There was an unknown error during the redirect
       */
      if (driveName.hasError()) {
        return driveName.getError()
      }

      /**
       * Finally, access the user
       */
      const driveUser = await driveName.user()
      if (driveUser.email === null) {
        const user = await User.firstOrCreate(
          {
            email: driveUser.name,
          },
          {
            name: driveUser.name,
            password: faker.internet.password(5),
            is_active: true,
            // @ts-ignore
            profile_pic: driveUser.avatarUrl,
          }
        )
        const token = await auth.use('api').generate(user)

        return response.withSuccess('user login success', { user, token })
      }
      const user = await User.firstOrCreate(
        {
          // @ts-ignore
          email: driveUser.email,
        },
        {
          name: driveUser.name,
          password: faker.internet.password(5),
          rememberMeToken: driveUser.token.token,
          is_active: true,
          // @ts-ignore
          profile_pic: driveUser.avatarUrl,
        }
      )
      const token = await auth.use('api').generate(user)

      return response.withSuccess('user login success', { user, token })
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
