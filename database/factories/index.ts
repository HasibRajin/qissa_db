import Factory from '@ioc:Adonis/Lucid/Factory'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Follow from 'App/Models/UserRelation'
import Reaction from 'App/Models/Reaction'

export const UserFactory = Factory.define(User, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: '12345',
  }
}).build()
export const PostFactory = Factory.define(Post, ({ faker }) => {
  return {
    user_id: 6,
    title: faker.lorem.sentence(4),
    details: faker.lorem.paragraphs(2),
  }
}).build()
export const FollowFactory = Factory.define(Follow, ({}) => {
  return {
    user_id: 5,
    follower_id: 9,
  }
}).build()
export const ReactionFactory = Factory.define(Reaction, ({}) => {
  return {
    user_id: 5,
    post_id: 35,
  }
}).build()
