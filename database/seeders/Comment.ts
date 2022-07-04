import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Comment from 'App/Models/Comment'
import faker from '@faker-js/faker'

export default class CommentSeeder extends BaseSeeder {
  public async run() {
    await Comment.createMany([
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 8,
      },
      {
        user_id: 8,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 110,
      },
      {
        user_id: 15,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 108,
      },
      {
        user_id: 2,
        comment_text: faker.lorem.paragraphs(5),
        post_id: 18,
      },
      {
        user_id: 6,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 8,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 15,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 16,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 2,
        comment_text: faker.lorem.paragraphs(6),
        post_id: 89,
      },
      {
        user_id: 25,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 22,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 29,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 38,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 6,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 8,
      },
      {
        user_id: 2,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 110,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 12,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 19,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 23,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 32,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 110,
      },
      {
        user_id: 16,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 105,
      },
      {
        user_id: 23,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 12,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 35,
      },
      {
        user_id: 5,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 19,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 83,
      },
      {
        user_id: 17,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 8,
      },
      {
        user_id: 8,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 110,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(5),
        post_id: 69,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 99,
      },
      {
        user_id: 6,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 28,
      },
      {
        user_id: 5,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 86,
      },
      {
        user_id: 2,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 34,
      },
      {
        user_id: 32,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 50,
      },
      {
        user_id: 5,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 110,
      },
      {
        user_id: 4,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 111,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 8,
      },
      {
        user_id: 8,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 110,
      },
      {
        user_id: 29,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 30,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 24,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 2,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 1,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(20),
        post_id: 114,
      },
      {
        user_id: 28,
        comment_text: faker.lorem.paragraphs(8),
        post_id: 13,
      },
      {
        user_id: 7,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 103,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 107,
      },
      {
        user_id: 3,
        comment_text: faker.lorem.paragraphs(2),
        post_id: 108,
      },
      {
        user_id: 1,
        comment_text: faker.lorem.paragraphs(5),
        post_id: 110,
      },
    ])
  }
}
