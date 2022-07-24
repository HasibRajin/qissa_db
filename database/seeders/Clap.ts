import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Clap from 'App/Models/Clap'

export default class ClapSeeder extends BaseSeeder {
  public async run() {
    await Clap.createMany([
      {
        user_id: 1,
        answer_id: 2,
      },
      {
        user_id: 2,
        answer_id: 4,
      },
      {
        user_id: 3,
        answer_id: 2,
      },
      {
        user_id: 4,
        answer_id: 2,
      },
      {
        user_id: 1,
        answer_id: 3,
      },
      {
        user_id: 5,
        answer_id: 3,
      },
      {
        user_id: 8,
        answer_id: 3,
      },
      {
        user_id: 2,
        answer_id: 13,
      },
      {
        user_id: 7,
        answer_id: 8,
      },
      {
        user_id: 11,
        answer_id: 6,
      },
      {
        user_id: 15,
        answer_id: 5,
      },
      {
        user_id: 19,
        answer_id: 5,
      },
      {
        user_id: 2,
        answer_id: 9,
      },
      {
        user_id: 9,
        answer_id: 11,
      },
      {
        user_id: 4,
        answer_id: 1,
      },
    ])
  }
}
