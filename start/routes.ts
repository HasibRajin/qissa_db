/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('home')
})
Route.get('/test', async () => {
  return { test: 'Api is working fine' }
})

Route.get('/callback/:drive', 'user/SocialLoginController.callback')
Route.get('/redirect/:drive', 'user/SocialLoginController.index')

Route.group(() => {
  Route.get('/user', 'user/AuthController.index')
  Route.get('/user/:id', 'user/AuthController.show')
  Route.post('/signup', 'user/AuthController.register')
  Route.post('/login', 'user/AuthController.login')
  Route.post('/socialLogin', 'user/SocialLoginController.socialLogin')
  Route.get('/verify-email/:email', 'user/EmailVerificationsController.confirm').as('verifyEmail')

  Route.get('/post', 'PostsController.index')
  Route.get('/post/:id', 'PostsController.show')
  Route.get('/topics', 'TopicsController.index')
  Route.get('/topics/:id', 'TopicsController.show')
}).prefix('api')

Route.group(() => {
  Route.post('/logout', 'user/AuthController.logout')
  Route.get('/profile', 'user/ProfilesController.index')
  Route.put('/user/info', 'user/ProfilesController.update')
  Route.put('/profile/info', 'user/ProfilesController.updateProfileInfo')
  Route.put('/profile/image', 'user/ProfilesController.updateProfilePic')

  Route.resource('/comment', 'CommentsController').apiOnly()
  Route.resource('/post', 'PostsController').apiOnly().except(['index', 'show'])

  Route.resource('/reaction', 'ReactionsController').apiOnly()
  Route.resource('/relation', 'UserRelationsController').apiOnly()

  Route.resource('/topic', 'TopicsController').apiOnly().except(['index', 'show'])
})

  .prefix('api')
  .middleware('auth')

Route.get('/privacy', async ({ view }) => {
  return view.render('privacypolicy')
})
