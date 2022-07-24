import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Answer from 'App/Models/Answer'
import faker from '@faker-js/faker'

export default class AnswerSeeder extends BaseSeeder {
  public async run() {
    await Answer.createMany([
      {
        user_id: 1,
        answer_details: faker.lorem.paragraph(2),
        question_id: 1,
      },
      {
        user_id: 3,
        answer_details: faker.lorem.paragraphs(2),
        question_id: 7,
      },
      {
        user_id: 8,
        answer_details: faker.lorem.paragraph(2),
        question_id: 25,
      },
      {
        user_id: 15,
        answer_details: faker.lorem.paragraphs(1),
        question_id: 12,
      },
      {
        user_id: 2,
        answer_details: faker.lorem.paragraphs(5),
        question_id: 18,
      },
      {
        user_id: 6,
        answer_details: faker.lorem.paragraph(8),
        question_id: 1,
      },
      {
        user_id: 8,
        answer_details: faker.lorem.paragraphs(2),
        question_id: 4,
      },
      {
        user_id: 15,
        answer_details: faker.lorem.paragraph(3),
        question_id: 3,
      },
      {
        user_id: 16,
        answer_details: faker.lorem.paragraphs(2),
        question_id: 9,
      },
      {
        user_id: 2,
        answer_details: faker.lorem.paragraphs(6),
        question_id: 19,
      },
      {
        user_id: 25,
        answer_details: faker.lorem.paragraph(2),
        question_id: 1,
      },
      {
        user_id: 22,
        answer_details: faker.lorem.paragraph(4),
        question_id: 15,
      },
      {
        user_id: 29,
        answer_details: faker.lorem.paragraph(5),
        question_id: 3,
      },
      {
        user_id: 38,
        answer_details: faker.lorem.paragraphs(3),
        question_id: 5,
      },
      {
        user_id: 6,
        answer_details: faker.lorem.paragraph(3),
        question_id: 13,
      },
      {
        user_id: 3,
        answer_details: faker.lorem.paragraphs(2),
        question_id: 8,
      },
      {
        user_id: 2,
        answer_details: faker.lorem.paragraph(2),
        question_id: 4,
      },
    ])
  }
}
