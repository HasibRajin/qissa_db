import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserRelation from 'App/Models/UserRelation'
import CreateRelation from 'App/Validators/StoreUserRelationRequest'

export default class UserRelationsController {
  public async index({ request, response, auth }: HttpContextContract) {
    try {
      const relatableId = auth.user?.id
      const data = request.qs().relatable_type
      const re = new RegExp(/^(follow|follower|favourite|block)$/g)
      if (!re.test(data)) {
        return response.withError('invalid relatable_type')
      } else if (data === 'follower') {
        // const follower = await Database.from('user_relations')
        //   .where({ user_id: relatableId })
        //   .andWhere({ relatable_type: 'follow' })
        //   .join('users', 'user_relations.relatable_id', '=', 'users.id')
        //   .select('user_relations.*', 'users.profile_pic', 'users.name')
        const follower = await UserRelation.query()
          .preload('follower')
          .where({ user_id: relatableId })
          .andWhere({ relatable_type: 'follow' })
        return response.withSuccess(`found ${follower.length} followers`, follower)
      }
      const relationData = await UserRelation.query()
        .preload('user')
        .where({ relatable_id: relatableId })
        .andWhere({ relatable_type: data })
      return response.withSuccess(`found ${relationData.length} ${data}`, relationData)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const relatableId = auth.user?.id
      const payload = await request.validate(CreateRelation)
      const user = await User.find(payload.user_id)
      const hasRelation = await UserRelation.query()
        .where({ user_id: payload.user_id })
        .andWhere({ relatable_id: relatableId })
        .first()
      if (hasRelation && !(hasRelation.relatable_type === payload.relatable_type)) {
        await hasRelation.delete()
      }
      const userRelation = await UserRelation.create({
        user_id: user?.id,
        relatable_id: relatableId,
        relatable_type: payload.relatable_type,
      })
      if (userRelation && payload.relatable_type === 'follow') {
        await User.query().where({ id: user?.id }).increment('follower_count', 1)
      }

      return response.withSuccess(
        `${auth.user?.name} successfully ${userRelation.relatable_type} ${user?.name}  `,
        userRelation
      )
    } catch (e) {
      if (e.messages) {
        return response.withError(e.messages)
      }
      return response.withError(e.message)
    }
  }

  public async show({ params: { id }, response, auth }: HttpContextContract) {
    try {
      const relatableID = auth.user?.id
      const relationData = await UserRelation.query()
        .preload('user')
        .where({ user_id: id })
        .andWhere({ relatable_id: relatableID })
        .first()
      return response.withSuccess(`found relation `, relationData)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, auth }: HttpContextContract) {
    try {
      const relatableId = auth.user?.id
      const relationData = await UserRelation.query().where({ id: id }).first()

      if (relationData?.relatable_id === relatableId) {
        if (relationData?.relatable_type === 'follow') {
          await User.query().where({ id: relationData.user_id }).decrement('follower_count', 1)
        }
        await relationData?.delete()

        return response.withSuccess(
          `${auth.user?.name} successfully un${relationData?.relatable_type} ${relationData?.user_id}`,
          relationData
        )
      }
      return response.json({
        success: false,
        message: `${auth.user?.name} doesn't have access to un${relationData?.relatable_type}.`,
      })
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
