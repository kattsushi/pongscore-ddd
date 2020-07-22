import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { environment } from '../environments/environment';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';

/**
 * App Module
 */
@Module({
  imports: [
    CoreModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${environment.db.user}:${environment.db.pass}@${environment.db.host}/${environment.db.database}?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, './../../../dist/apps', 'pong-score'),
    }),
  ],
  providers: [],
})
export class AppModule {}
