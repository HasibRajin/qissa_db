import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserRelation from 'App/Models/UserRelation'

export default class FollowSeeder extends BaseSeeder {
  public async run() {
    await UserRelation.createMany([
      {
        user_id: 18,
        relatable_id: 2,
        relatable_type: 'follow',
      },
      {
        user_id: 18,
        relatable_id: 3,
        relatable_type: 'follow',
      },
      {
        user_id: 18,
        relatable_id: 4,
        relatable_type: 'favourite',
      },
      {
        user_id: 18,
        relatable_id: 5,
        relatable_type: 'follow',
      },
      {
        user_id: 18,
        relatable_id: 6,
        relatable_type: 'block',
      },
      {
        user_id: 1,
        relatable_id: 3,
        relatable_type: 'follow',
      },
      {
        user_id: 1,
        relatable_id: 4,
        relatable_type: 'favourite',
      },
      {
        user_id: 1,
        relatable_id: 5,
        relatable_type: 'follow',
      },
      {
        user_id: 1,
        relatable_id: 6,
        relatable_type: 'block',
      },
      {
        user_id: 1,
        relatable_id: 7,
        relatable_type: 'follow',
      },
      {
        user_id: 2,
        relatable_id: 1,
        relatable_type: 'follow',
      },
      {
        user_id: 2,
        relatable_id: 4,
        relatable_type: 'favourite',
      },
      {
        user_id: 2,
        relatable_id: 5,
        relatable_type: 'follow',
      },
      {
        user_id: 2,
        relatable_id: 6,
        relatable_type: 'block',
      },
      {
        user_id: 2,
        relatable_id: 7,
        relatable_type: 'block',
      },
      {
        user_id: 3,
        relatable_id: 2,
        relatable_type: 'follow',
      },
      {
        user_id: 3,
        relatable_id: 1,
        relatable_type: 'block',
      },
      {
        user_id: 3,
        relatable_id: 4,
        relatable_type: 'favourite',
      },
      {
        user_id: 3,
        relatable_id: 5,
        relatable_type: 'follow',
      },
      {
        user_id: 3,
        relatable_id: 6,
        relatable_type: 'favourite',
      },
      {
        user_id: 3,
        relatable_id: 7,
        relatable_type: 'follow',
      },
      {
        user_id: 4,
        relatable_id: 2,
        relatable_type: 'block',
      },
      {
        user_id: 4,
        relatable_id: 3,
        relatable_type: 'follow',
      },
      {
        user_id: 4,
        relatable_id: 1,
        relatable_type: 'favourite',
      },
      {
        user_id: 4,
        relatable_id: 6,
        relatable_type: 'block',
      },
      {
        user_id: 4,
        relatable_id: 7,
        relatable_type: 'follow',
      },
      {
        user_id: 5,
        relatable_id: 2,
        relatable_type: 'follow',
      },
      {
        user_id: 5,
        relatable_id: 3,
        relatable_type: 'favourite',
      },
      {
        user_id: 5,
        relatable_id: 4,
        relatable_type: 'favourite',
      },
      {
        user_id: 5,
        relatable_id: 1,
        relatable_type: 'favourite',
      },
      {
        user_id: 5,
        relatable_id: 6,
        relatable_type: 'block',
      },
      {
        user_id: 5,
        relatable_id: 7,
        relatable_type: 'block',
      },
      {
        user_id: 6,
        relatable_id: 2,
        relatable_type: 'block',
      },
      {
        user_id: 6,
        relatable_id: 3,
        relatable_type: 'follow',
      },
      {
        user_id: 6,
        relatable_id: 4,
        relatable_type: 'block',
      },
      {
        user_id: 6,
        relatable_id: 5,
        relatable_type: 'follow',
      },
      {
        user_id: 6,
        relatable_id: 1,
        relatable_type: 'block',
      },
      {
        user_id: 6,
        relatable_id: 7,
        relatable_type: 'follow',
      },
      {
        user_id: 20,
        relatable_id: 1,
        relatable_type: 'favourite',
      },
      {
        user_id: 22,
        relatable_id: 6,
        relatable_type: 'block',
      },
      {
        user_id: 25,
        relatable_id: 7,
        relatable_type: 'block',
      },
      {
        user_id: 8,
        relatable_id: 2,
        relatable_type: 'block',
      },
      {
        user_id: 9,
        relatable_id: 3,
        relatable_type: 'follow',
      },
      {
        user_id: 10,
        relatable_id: 4,
        relatable_type: 'block',
      },
      {
        user_id: 20,
        relatable_id: 5,
        relatable_type: 'follow',
      },
      {
        user_id: 15,
        relatable_id: 1,
        relatable_type: 'block',
      },
      {
        user_id: 12,
        relatable_id: 7,
        relatable_type: 'follow',
      },
    ])
  }
}
