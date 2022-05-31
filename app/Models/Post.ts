import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Reaction from 'App/Models/Reaction'
import Comment from 'App/Models/Comment'

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
  public like_count: number

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Reaction, {
    foreignKey: 'post_id', // post_id column on "Reaction" model
  })
  public reactions: HasMany<typeof Reaction>
  @hasMany(() => Comment, {
    foreignKey: 'post_id', // post_id column on "Reaction" model
  })
  public comments: HasMany<typeof Comment>
}
