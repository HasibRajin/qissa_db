import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserRelation from 'App/Models/UserRelation'
import CreateRelation from 'App/Validators/StoreUserRelationRequest'

export default class UserRelationsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const relatableId = request.qs().relatable_id
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
          .preload('followers', (followersQuery) => {
            followersQuery.withCount('follower')
          })
          .where({ user_id: relatableId })
          .andWhere({ relatable_type: 'follow' })
          .orderBy([
            {
              column: 'created_at',
              order: 'desc',
            },
          ])
          .paginate(request.qs().current_page, request.qs().limit)

        return response.withSuccess(`found ${follower.length} followers`, follower)
      }
      const relationData = await UserRelation.query()
        .preload('user', (userQuery) => {
          userQuery.withCount('follower')
        })
        .where({ relatable_id: relatableId })
        .andWhere({ relatable_type: data })
        .orderBy([
          {
            column: 'created_at',
            order: 'desc',
          },
        ])
        .paginate(request.qs().current_page, request.qs().limit)

      return response.withSuccess(`found ${relationData.length} ${data}`, relationData)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ request, response, auth }: HttpContextContract) {
    try {
      const payload = await request.validate(CreateRelation)
      // const userRelation = await UserRelation.create({
      //   user_id: payload.user_id,
      //   relatable_id: auth.user?.id,
      //   relatable_type: payload.relatable_type,
      // })

      const userRelation = await UserRelation.updateOrCreate(
        {
          user_id: payload.user_id,
          relatable_id: auth.user?.id,
        },
        {
          relatable_type: payload.relatable_type,
        }
      )
      return response.withSuccess('follow successfully', userRelation)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, request, response, bouncer, auth }: HttpContextContract) {
    try {
      const relationData = await UserRelation.query()
        .where({ user_id: id })
        .andWhere({ relatable_id: auth.user?.id })
        .first()

      // @ts-ignore
      await bouncer.authorize('userRelation', relationData)
      const relatableType = request.only(['relatable_type'])
      relationData?.merge(relatableType)
      const relation = await relationData?.save()
      return response.withSuccess('update success', relation)
    } catch (e) {
      return response.withError(e.message)
    }
  }
  // take user id as parameter and check the login user have any relation with the other user.
  public async show({ params: { id }, response, auth }: HttpContextContract) {
    try {
      const relationData = await UserRelation.query()
        .preload('user')
        .where({ user_id: id })
        .andWhere({ relatable_id: auth.user?.id })
        .first()
      return response.withSuccess(`found relation `, relationData)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, bouncer, auth }: HttpContextContract) {
    try {
      // const relationData = await UserRelation.findOrFail(id)
      const relation = await UserRelation.query()
        .where({ user_id: id })
        .andWhere({ relatable_id: auth.user?.id })
        .first()
      // @ts-ignore
      await bouncer.authorize('userRelation', relation)
      await relation?.delete()
      return response.withSuccess(` successfully un${relation?.relatable_type}`, relation)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
