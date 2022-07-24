import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Answer from 'App/Models/Answer'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public topic_id: number

  @column()
  public title: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras = true

  @hasMany(() => Answer, {
    foreignKey: 'question_id', // post_id column on "Reaction" model
  })
  public answers: HasMany<typeof Answer>

  @belongsTo(() => User, {
    foreignKey: 'user_id', // user_id column on "Reaction" model
  })
  public user: BelongsTo<typeof User>
}
