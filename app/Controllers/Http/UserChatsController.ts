// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserChat from 'App/Models/UserChat'
import { DateTime } from 'luxon'

export default class UserChatsController {
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const messengerData = await UserChat.query()
        .where({ user_id: auth.user?.id })
        .preload('messengers')
        .where({ is_block: false })
        .orderBy([
          {
            column: 'chat_at',
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
      const now = DateTime.now()

      await UserChat.updateOrCreate(
        {
          user_id: auth.user?.id,
          messenger_id: data.messenger_id,
        },
        {
          is_block: false,
          chat_at: now,
        }
      )
      return response.withSuccess('chat successfully')
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, request, response, auth }: HttpContextContract) {
    try {
      const data = request.only(['is_block', 'chat_at'])
      const userChat = await UserChat.findOrFail(id)
      if (userChat.user_id !== auth.user?.id) {
        throw new Error('user id mismatch')
      }
      userChat?.merge(data)
      await userChat?.save()
      return response.withSuccess('update success')
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async show({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
