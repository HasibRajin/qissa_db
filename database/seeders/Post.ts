import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import faker from '@faker-js/faker'
import Post from 'App/Models/Post'

export default class PostSeeder extends BaseSeeder {
  public async run() {
    await Post.createMany([
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        like_count: 0,
        topic_id: 1,
      },
    ])
  }
}
