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
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 3,
      },
      {
        user_id: 3,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 4,
      },
      {
        user_id: 5,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 3,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 5,
      },
      {
        user_id: 6,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 3,
      },
      {
        user_id: 3,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 2,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 8,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 7,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 4,
      },
      {
        user_id: 3,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 4,
      },
      {
        user_id: 12,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 2,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 3,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 4,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 2,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 5,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 4,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 5,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 4,
      },
      {
        user_id: 3,
        title: faker.lorem.sentence(4),
        details: faker.lorem.paragraphs(2),
        topic_id: 2,
      },
    ])
  }
}
