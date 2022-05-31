import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Profile from 'App/Models/Profile'
import User from 'App/Models/User'

export default class ProfilesController {
  public async index({ response, auth }: HttpContextContract) {
    try {
      const profiles = await Profile.query().where({ user_id: auth.user?.id })
      return response.json({
        success: true,
        message: `Found  users`,
        profiles: profiles,
      })
    } catch (e) {
      return response.json({
        success: true,
        message: e.message,
      })
    }
  }

  // public async store({request,response,auth}: HttpContextContract) {}

  public async update({ request, response, auth }: HttpContextContract) {
    try {
      const userID = auth.user?.id
      const user = await User.query().where({ id: userID }).first()
      const userData = request.only(['name', 'profile_pic'])
      user?.merge(userData)
      const profile = await Profile.query().where({ user_id: userID }).first()
      const profileData = request.only(['phone', 'date_of_birth', 'gender', 'education', 'address'])
      profile?.merge(profileData)
      const userProfile = await profile?.save()

      return response.withSuccess(`profile of ${user?.name} is updated successfully`, userProfile)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({}: HttpContextContract) {}
}
