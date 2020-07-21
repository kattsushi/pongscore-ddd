import { Module } from '@nestjs/common';

import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [
    NodemailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'ccdff3b99c83ec',
          pass: 'a700a7eafe1e28',
        },
      },
      defaults: {
        from: 'Hello @Crowdlinker <hello@crowdlinker.com>',
      },
    } as NodemailerOptions<NodemailerDrivers.SMTP>)
  ],
  providers: [MailerService],
  exports:[MailerService]
})
export class CoreModule {}
