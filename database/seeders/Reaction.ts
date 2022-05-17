import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ReactionFactory } from 'Database/factories'

export default class LikeSeeder extends BaseSeeder {
  public async run() {
    await ReactionFactory.create()
  }
}
