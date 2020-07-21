import { Module } from '@nestjs/common';

import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';
import { MailerService } from './mailer/mailer.service';
import { environment } from '../../environments/environment';

@Module({
  imports: [
    NodemailerModule.forRoot({
      transport: {
        host: environment.mail.host,
        port: environment.mail.port,
        auth: {
          user: environment.mail.user,
          pass: environment.mail.pass,
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
