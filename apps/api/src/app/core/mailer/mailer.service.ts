import { Injectable } from '@nestjs/common';
import { Nodemailer } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';

export interface MailOptions {
  from: string;
  to: string; // list of receivers (separated by ,)
  subject: string;
  text: string;
  html: string;  // html body
}
/**
 *
 * @export
 * @class MailerService
 */
@Injectable()
export class MailerService {
  /**
   * Creates an instance of mailer service.
   * @param nodemailer
   */
  constructor(private readonly nodemailer: Nodemailer<NodemailerDrivers.SMTP>) { }
  /**
   * Mails mailer service
   * @param mailOptions
   */
  async mail(mailOptions: MailOptions) {
    return this.nodemailer.sendMail(mailOptions);
  }
}
