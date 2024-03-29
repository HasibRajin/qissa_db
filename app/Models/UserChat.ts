import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class UserChat extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public messenger_id: number

  @column()
  public is_block: boolean

  @column.dateTime()
  public chat_at: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => User, {
    foreignKey: 'id',
    localKey: 'messenger_id', // user_id column on "Post" model
  })
  public messengers: HasMany<typeof User>

  @belongsTo(() => User, {
    foreignKey: 'id',
    localKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
}
