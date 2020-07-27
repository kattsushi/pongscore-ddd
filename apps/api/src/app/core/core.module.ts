import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { CoreMailerService } from './mailer/mailer.service';
import { environment } from '../../environments/environment';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { Translations } from './translations/translations.service';

@Module({
  imports: [
    MailerModule.forRoot({
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
  providers: [CoreMailerService, LoggerMiddleware, Translations],
  exports: [CoreMailerService, LoggerMiddleware, Translations],
})
export class CoreModule {}
