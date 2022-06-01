import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserRelation from 'App/Models/UserRelation'

export default class FollowSeeder extends BaseSeeder {
  public async run() {
    await UserRelation.createMany([
      {
        user_id: 1,
        relatable_id: 2,
        relatable_type: 'follow',
      },
    ])
  }
}
