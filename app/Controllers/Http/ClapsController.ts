import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Clap from 'App/Models/Clap'

export default class ClapsController {
  public async index({ response }: HttpContextContract) {
    try {
      const clap = await Clap.query().preload('user')
      return response.withSuccess(`found claps`, clap)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const user = auth.user
      const answerID = request.qs().anser_id
      const clap = await Clap.create({
        user_id: user?.id,
        answer_id: answerID,
      })
      return response.withSuccess(`clap success`, clap)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({ params: { id }, response, bouncer, auth }: HttpContextContract) {
    try {
      const clap = await Clap.query()
        .where({ user_id: auth.user?.id })
        .andWhere({ answer_id: id })
        .first()

      // @ts-ignore
      await bouncer.authorize('userClap', clap)

      await clap?.delete()
      return response.withSuccess(`Unlike successfully`, clap)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
