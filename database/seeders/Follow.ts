import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FollowFactory } from 'Database/factories'

export default class FollowSeeder extends BaseSeeder {
  public async run() {
    await FollowFactory.create()
  }
}
