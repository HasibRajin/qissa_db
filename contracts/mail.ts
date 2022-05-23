import { PostMarkConfig } from '../providers/PostMarkDriver'

declare module '@ioc:Adonis/Addons/Mail' {
  interface MailersList {
    mailgun: MailDrivers['mailgun']
    postmark: {
      config: PostMarkConfig
      implementation: MailDriverContract
    }
  }
}
