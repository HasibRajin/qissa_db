import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import Profile from 'App/Models/Profile'
import Post from 'App/Models/Post'
import Reaction from 'App/Models/Reaction'
import Mail from '@ioc:Adonis/Addons/Mail'
import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import UserRelation from 'App/Models/UserRelation'
import Question from 'App/Models/Question'
import Clap from 'App/Models/Clap'
import UserChat from 'App/Models/UserChat'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public profile_pic: string

  @column()
  public is_active: boolean

  @column({ serializeAs: null })
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public async sendVerificationEmail() {
    const appDomain = Env.get('APP_URL')
    const appName = Env.get('APP_NAME')
    const currentYear = new Date().getFullYear()
    const url = Route.builder()
      .params({ email: this.email })
      .prefixUrl(appDomain)
      .makeSigned('verifyEmail', { expiresIn: '24hours' })
    await Mail.send((message) => {
      message
        .from(Env.get('DEFAULT_MAIL'))
        .to(this.email)
        .subject('Adda - email verification')
        .htmlView('emails/auth/verify', { user: this, url, appName, appDomain, currentYear })
    })
  }
  public serializeExtras = true

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => Profile, {
    foreignKey: 'user_id',
  })
  public profile: HasOne<typeof Profile>

  @hasMany(() => Post, {
    foreignKey: 'user_id', // user_id column on "Post" model
  })
  public posts: HasMany<typeof Post>

  @hasMany(() => Reaction, {
    foreignKey: 'user_id', // user_id column on "Like" model
  })
  public reactions: HasMany<typeof Reaction>

  @hasMany(() => UserRelation, {
    foreignKey: 'user_id', // user_id column on "Like" model
  })
  public follower: HasMany<typeof UserRelation>

  @hasMany(() => Question, {
    foreignKey: 'user_id', // user_id column on "Post" model
  })
  public questions: HasMany<typeof Question>

  @hasMany(() => Clap, {
    foreignKey: 'user_id', // user_id column on "Like" model
  })
  public claps: HasMany<typeof Clap>

  @hasMany(() => UserChat, {
    foreignKey: 'user_id',
    localKey: 'id',
  })
  public users: HasMany<typeof UserChat>
}
