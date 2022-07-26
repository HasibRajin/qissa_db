import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateComment from 'App/Validators/QuestionAnswer/CreateAnswerValidator'
import Answer from 'App/Models/Answer'

export default class AnswersController {
  public async index({}: HttpContextContract) {
    return await Answer.all()
  }

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const userId = auth.user?.id
      const answerData = await request.validate(CreateComment)
      const answer = await Answer.create({
        user_id: userId,
        question_id: answerData.question_id,
        answer_details: answerData.answer_details,
      })
      return response.withSuccess('answer creation success', [answer])
    } catch (e) {
      if (e.messages) {
        return response.withError(e.messages)
      }
      return response.withError(e.message)
    }
  }

  public async show({ request, response, params: { id } }: HttpContextContract) {
    try {
      const likerId = request.qs().liker_id
      if (likerId) {
        const answer = await Answer.query()
          .where({ question_id: id })
          .preload('user')
          .preload('claps', (clapsQuery) => {
            clapsQuery.where({ user_id: likerId })
          })
          .withCount('claps')
          .orderBy([
            {
              column: 'id',
              order: 'desc',
            },
          ])
        return response.withSuccess(`found  answers`, answer)
      }
      const answer = await Answer.query()
        .where({ question_id: id })
        .preload('user')
        .withCount('claps')
        .orderBy([
          {
            column: 'id',
            order: 'desc',
          },
        ])
      return response.withSuccess(`found  answers`, answer)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async update({ params: { id }, response, request, bouncer }: HttpContextContract) {
    try {
      const userAnswer = await Answer.findOrFail(id)
      await bouncer.authorize('userAnswer', userAnswer)
      const AnswerData = request.only(['answer_details'])
      userAnswer?.merge(AnswerData)
      const answer = await userAnswer?.save()
      return response.withSuccess(`comment is updated successfully`, answer)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, bouncer }: HttpContextContract) {
    try {
      const answer = await Answer.findOrFail(id)
      await bouncer.authorize('userAnswer', answer)

      await answer?.delete()
      return response.withSuccess(`answer is deleted successfully`, answer)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
