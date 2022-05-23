import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class EmailVerificationsController {
  public async confirm({ request, params, view }: HttpContextContract) {
    if (request.hasValidSignature()) {
      const user = await User.findByOrFail('email', params.email)
      if (!user.is_active) {
        user.is_active = true
        await user.save()
        return view.render('emails/auth/success', { message: 'activation success!' })
      } else {
        return view.render('emails/auth/success', { message: 'Account was already verified!' })
      }
    } else {
      return view.render('emails/auth/success', { message: 'invalid token!' })
    }
  }
}
