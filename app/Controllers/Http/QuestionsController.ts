import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import CreateQuestion from 'App/Validators/QuestionAnswer/CreateQuestionValidator'
import Question from 'App/Models/Question'

export default class QuestionsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      const question = await Question.query()
        .preload('user')
        .withCount('answers')
        .orderBy([
          {
            column: 'id',
            order: 'desc',
          },
        ])
        .paginate(request.qs().current_page, request.qs().limit)

      return response.withSuccess(`Found questions`, question)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async store({ response, request, auth }: HttpContextContract) {
    try {
      const user = auth.user
      const questionData = await request.validate(CreateQuestion)

      const question = await Question.create({
        user_id: user?.id,
        topic_id: questionData.topic_id,
        title: questionData.title,
      })
      return response.withSuccess('question creation success', [question])
    } catch (e) {
      if (e.messages) {
        return response.withError(e.messages)
      }
      return e.messages ? response.withError(e.messages) : response.withError(e.message)
    }
  }

  public async show({}: HttpContextContract) {}

  public async update({ params: { id }, response, request, bouncer }: HttpContextContract) {
    try {
      const question = await Question.findOrFail(id)
      await bouncer.authorize('userQuestion', question)

      const questionData = request.only(['title'])
      question?.merge(questionData)
      const userPost = await question?.save()

      return response.withSuccess(`post is updated successfully`, userPost)
    } catch (e) {
      return response.withError(e.message)
    }
  }

  public async destroy({ params: { id }, response, bouncer }: HttpContextContract) {
    try {
      const question = await Question.findOrFail(id)
      await bouncer.authorize('userQuestion', question)
      await question?.delete()
      return response.withSuccess(`post is deleted successfully`, question)
    } catch (e) {
      return response.withError(e.message)
    }
  }
}
