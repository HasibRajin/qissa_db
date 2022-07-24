import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Clap from 'App/Models/Clap'

export default class Answer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public question_id: number

  @column()
  public answer_details: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras = true

  @belongsTo(() => User, {
    foreignKey: 'user_id', // user_id column on "Reaction" model
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Clap, {
    foreignKey: 'answer_id',
  })
  public claps: HasMany<typeof Clap>
}
