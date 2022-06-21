import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Reaction from 'App/Models/Reaction'
import Comment from 'App/Models/Comment'
import User from 'App/Models/User'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  @column()
  public user_id: number
  @column()
  public topic_id: number
  @column()
  public title: string

  @column()
  public details: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public serializeExtras = true

  @hasMany(() => Reaction, {
    foreignKey: 'post_id',
  })
  public reactions: HasMany<typeof Reaction>

  @hasMany(() => Comment, {
    foreignKey: 'post_id', // post_id column on "Reaction" model
  })
  public comments: HasMany<typeof Comment>

  @belongsTo(() => User, {
    foreignKey: 'user_id', // user_id column on "Reaction" model
  })
  public user: BelongsTo<typeof User>
}
