import { Module } from '@nestjs/common';
import * as path from 'path';
import { NodemailerModule } from '@crowdlinker/nestjs-mailer';
import { NodemailerDrivers } from '@crowdlinker/nestjs-mailer';
import { NodemailerOptions } from '@crowdlinker/nestjs-mailer';

import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { CoreMailerService } from './mailer/mailer.service';
import { environment } from '../../environments/environment';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    // NodemailerModule.forRoot({
    //   transport: {
    //     host: environment.mail.host,
    //     port: environment.mail.port,
    //     auth: {
    //       user: environment.mail.user,
    //       pass: environment.mail.pass,
    //     },
    //   },
    //   defaults: {
    //     from: 'Hello @Crowdlinker <hello@crowdlinker.com>',
    //   },
    // } as NodemailerOptions<NodemailerDrivers.SMTP>),
    MailerModule.forRoot({
      // transport: `smtps://${environment.mail.user}:${environment.mail.pass}@${environment.mail.host}:${environment.mail.port}`,
      transport: {
        host: environment.mail.host,
        port: environment.mail.port,
        auth: {
          user: environment.mail.user,
          pass: environment.mail.pass,
        },
      },
      defaults: {
        from: 'PongScore <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/assets/templates/pages',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [CoreMailerService, LoggerMiddleware],
  exports: [CoreMailerService, LoggerMiddleware],
})
export class CoreModule {}
