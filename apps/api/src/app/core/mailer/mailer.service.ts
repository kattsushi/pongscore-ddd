import { Injectable } from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';

/**
 *
 * @export
 * @class MailerService
 */
@Injectable()
export class CoreMailerService {
  /**
   * Creates an instance of mailer service.
   * @param nodemailer
   */
  constructor(private readonly mailerService: MailerService) {}
  /**
   * Mails mailer service
   * @param mailOptions
   */
  async mail(mailOptions: ISendMailOptions) {
    return this.mailerService.sendMail(mailOptions);
  }
}
