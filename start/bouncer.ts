/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import User from 'App/Models/User'
import Post from 'App/Models/Post'
import Comment from 'App/Models/Comment'
import Reaction from '../app/Models/Reaction'
import UserRelation from '../app/Models/UserRelation'
import Question from 'App/Models/Question'
import Answer from 'App/Models/Answer'
import Clap from 'App/Models/Clap'

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
export const { actions } = Bouncer.define('userPost', (user: User, post: Post) => {
  return post.user_id === user.id
})
  .define('userComment', (user: User, comment: Comment) => {
    return comment.user_id === user.id
  })
  .define('userReaction', (user: User, reaction: Reaction) => {
    return reaction.user_id === user.id
  })
  .define('userRelation', (user: User, relation: UserRelation) => {
    return relation.relatable_id === user.id
  })
  .define('userQuestion', (user: User, question: Question) => {
    return question.user_id === user.id
  })
  .define('userAnswer', (user: User, answer: Answer) => {
    return answer.user_id === user.id
  })
  .define('userClap', (user: User, clap: Clap) => {
    return clap.user_id === user.id
  })
/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
