import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'
import Question from 'App/Models/Question'

export default class Topic extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Post, {
    foreignKey: 'topic_id', // user_id column on "Post" model
  })
  public posts: HasMany<typeof Post>

  @hasMany(() => Question, {
    foreignKey: 'topic_id', // user_id column on "Post" model
  })
  public questions: HasMany<typeof Question>
}
