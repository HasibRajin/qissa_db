// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserChat from 'App/Models/UserChat'

export default class UserChatsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const messengerData = await UserChat.query()
        .preload('messengers')
        .where({ is_block: false })
        .orderBy([
          {
            column: 'id',
            order: 'desc',
          },
        ])
        .paginate(request.qs().current_page, request.qs().limit)

      return response.withSuccess(`found messenger`, messengerData)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const data = request.only(['messenger_id'])
      await UserChat.updateOrCreate(
        {
          user_id: auth.user?.id,
          messenger_id: data.messenger_id,
        },
        {
          is_block: false,
        }
      )
      return response.withSuccess('chat successfully')
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, response, auth }: HttpContextContract) {
    try {
      const userChat = await UserChat.query()
        .where({ user_id: auth.user?.id })
        .andWhere({ messenger_id: id })
        .first()
      userChat?.merge({ is_block: true })
      await userChat?.save()
      return response.withSuccess('update success')
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async show({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
