import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import faker from '@faker-js/faker'
import Question from 'App/Models/Question'

export default class QuestionSeeder extends BaseSeeder {
  public async run() {
    await Question.createMany([
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.paragraph(2),
        topic_id: 1,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        topic_id: 1,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        topic_id: 3,
      },
      {
        user_id: 3,
        title: faker.lorem.paragraph(3),
        topic_id: 4,
      },
      {
        user_id: 5,
        title: faker.lorem.sentence(6),
        topic_id: 3,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        topic_id: 5,
      },
      {
        user_id: 6,
        title: faker.lorem.sentence(4),
        topic_id: 1,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        topic_id: 3,
      },
      {
        user_id: 7,
        title: faker.lorem.sentence(4),
        topic_id: 4,
      },

      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        topic_id: 2,
      },
      {
        user_id: 10,
        title: faker.lorem.sentence(4),
        topic_id: 5,
      },
      {
        user_id: 15,
        title: faker.lorem.sentence(4),
        topic_id: 2,
      },
      {
        user_id: 13,
        title: faker.lorem.sentence(4),
        topic_id: 4,
      },
      {
        user_id: 10,
        title: faker.lorem.sentence(4),
        topic_id: 2,
      },

      {
        user_id: 6,
        title: faker.lorem.sentence(5),
        topic_id: 5,
      },
      {
        user_id: 5,
        title: faker.lorem.sentence(4),
        topic_id: 4,
      },
      {
        user_id: 18,
        title: faker.lorem.sentence(8),
        topic_id: 2,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        topic_id: 1,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(12),
        topic_id: 4,
      },
      {
        user_id: 17,
        title: faker.lorem.paragraph(3),
        topic_id: 3,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(4),
        topic_id: 2,
      },

      {
        user_id: 5,
        title: faker.lorem.sentence(5),
        topic_id: 3,
      },

      {
        user_id: 3,
        title: faker.lorem.sentence(4),
        topic_id: 4,
      },
      {
        user_id: 4,
        title: faker.lorem.paragraph(3),
        topic_id: 2,
      },
      {
        user_id: 18,
        title: faker.lorem.sentence(2),
        topic_id: 5,
      },
      {
        user_id: 13,
        title: faker.lorem.sentence(5),
        topic_id: 1,
      },

      {
        user_id: 14,
        title: faker.lorem.sentence(1),
        topic_id: 5,
      },
      {
        user_id: 2,
        title: faker.lorem.sentence(4),
        topic_id: 4,
      },
      {
        user_id: 1,
        title: faker.lorem.sentence(3),
        topic_id: 2,
      },
    ])
  }
}
