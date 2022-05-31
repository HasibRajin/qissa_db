import type { EventsList } from '@ioc:Adonis/Core/Event'
import Pusher from 'pusher'
import Env from '@ioc:Adonis/Core/Env'
let pusher = new Pusher({
  appId: Env.get('PUSHER_APP_ID', ''),
  key: Env.get('PUSHER_KEY', ''),
  secret: Env.get('PUSHER_SECRET', ''),
  cluster: Env.get('PUSHER_CLUSTER'),
  encrypted: true,
})
export default class User {
  public async onNewUser(user: EventsList['new:user']) {
    await pusher.trigger('qissabd', 'user', {
      user: user.name,
      email: user.email,
      id: user.id,
    })
  }
  public async onNewPost(post: EventsList['new:post']) {
    await pusher.trigger('qissabd', 'post', {
      postId: post.id,
      userID: post.userID,
      message: post.message,
    })
  }
}
