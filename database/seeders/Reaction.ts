import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Reaction from 'App/Models/Reaction'

export default class LikeSeeder extends BaseSeeder {
  public async run() {
    await Reaction.createMany([
      {
        user_id: 1,
        post_id: 2,
        reaction_type: 'like',
      },
      {
        user_id: 2,
        post_id: 4,
        reaction_type: 'love',
      },
      {
        user_id: 3,
        post_id: 2,
        reaction_type: 'like',
      },
      {
        user_id: 4,
        post_id: 2,
        reaction_type: 'like',
      },
      {
        user_id: 1,
        post_id: 3,
        reaction_type: 'love',
      },
      {
        user_id: 5,
        post_id: 3,
        reaction_type: 'like',
      },
      {
        user_id: 8,
        post_id: 3,
        reaction_type: 'love',
      },
      {
        user_id: 2,
        post_id: 3,
        reaction_type: 'like',
      },
      {
        user_id: 7,
        post_id: 3,
        reaction_type: 'like',
      },
      {
        user_id: 11,
        post_id: 3,
        reaction_type: 'like',
      },
      {
        user_id: 15,
        post_id: 3,
        reaction_type: 'like',
      },
      {
        user_id: 19,
        post_id: 3,
        reaction_type: 'like',
      },
      {
        user_id: 2,
        post_id: 5,
        reaction_type: 'like',
      },
      {
        user_id: 9,
        post_id: 5,
        reaction_type: 'like',
      },
      {
        user_id: 4,
        post_id: 5,
        reaction_type: 'love',
      },
      {
        user_id: 1,
        post_id: 5,
        reaction_type: 'like',
      },
      {
        user_id: 24,
        post_id: 5,
        reaction_type: 'like',
      },
      {
        user_id: 2,
        post_id: 6,
        reaction_type: 'love',
      },
      {
        user_id: 3,
        post_id: 6,
        reaction_type: 'like',
      },
      {
        user_id: 9,
        post_id: 6,
        reaction_type: 'love',
      },
      {
        user_id: 10,
        post_id: 6,
        reaction_type: 'like',
      },
      {
        user_id: 17,
        post_id: 6,
        reaction_type: 'like',
      },
      {
        user_id: 13,
        post_id: 6,
        reaction_type: 'love',
      },
      {
        user_id: 11,
        post_id: 6,
        reaction_type: 'like',
      },
      {
        user_id: 25,
        post_id: 6,
        reaction_type: 'love',
      },
    ])
  }
}
