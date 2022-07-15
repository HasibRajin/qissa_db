import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'

export default class ProfilesController {
  public async index({ response, auth }: HttpContextContract) {
    try {
      const profile = await Profile.query().where({ user_id: auth.user?.id }).first()
      return response.withSuccess(`Found  profile`, profile)
      // return response.json({
      //   success: true,
      //   message: `Found  profile`,
      //   profiles: profiles,
      // })
    } catch (e) {
      return response.withError(e.message)
    }
  }

  // public async store({request,response,auth}: HttpContextContract) {}

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      const loginUser = auth.user
      const userData = request.only(['name', 'email'])
      loginUser?.merge(userData)
      await loginUser?.save()
      const profileData = request.only(['phone'])

      const profile = await loginUser?.related('profile').updateOrCreate(
        {},
        {
          user_id: loginUser?.id,
          phone: profileData.phone,
        }
      )

      return response.withSuccess(`profile of ${loginUser?.name} is updated successfully`, profile)
    } catch (e) {
      return response.withError(e.message)
    }
  }
  public async updateProfileInfo({ request, response, auth }: HttpContextContract) {
    try {
      const loginUser = auth.user
      const profileData = request.only(['date_of_birth', 'gender', 'education', 'address'])

      const profile = await loginUser?.related('profile').updateOrCreate(
        {},
        {
          user_id: loginUser?.id,
          date_of_birth: profileData.date_of_birth,
          gender: profileData.gender,
          education: profileData.education,
          address: profileData.address,
        }
      )
      return response.withSuccess(`profile of ${loginUser?.name} is updated successfully`, profile)
    } catch (e) {
      return response.withError(e.message)
    }
  }
  public async updateProfilePic({ request, response, auth }: HttpContextContract) {
    try {
      const loginUser = auth.user
      const userData = request.only(['profile_pic'])
      loginUser?.merge(userData)
      await loginUser?.save()
      return response.withSuccess(`profile of ${loginUser?.name} is updated successfully`, userData)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({}: HttpContextContract) {}
}
