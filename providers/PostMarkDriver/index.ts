import nodemailer from 'nodemailer'
import postMarkTransport from 'nodemailer-postmark-transport'
import { MailDriverContract, MessageNode } from '@ioc:Adonis/Addons/Mail'

/**
 * Config accepted by the driver
 */
export type PostMarkConfig = {
  driver: 'postmark'
  auth: {
    apiKey: string
  }
}

export class PostMarkDriver implements MailDriverContract {
  private transporter: any

  constructor(private config: PostMarkConfig) {
    /**
     * Instantiate the nodemailer transport
     */
    this.transporter = nodemailer.createTransport(postMarkTransport(this.config))
  }

  /**
   * Send email using the underlying transport
   */
  public async send(message: MessageNode) {
    return this.transporter.sendMail(message)
  }

  /**
   * Cleanup resources
   */
  public close() {
    this.transporter.close()
    this.transporter = null
  }
}
