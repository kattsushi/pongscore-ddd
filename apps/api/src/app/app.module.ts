import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { environment } from '../environments/environment';

/**
 * App Module
 */
@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(
      `mongodb+srv://${environment.dbuser}:${environment.dbpass}@${environment.dbhost}/${environment.db}?retryWrites=true&w=majority`,
      { useNewUrlParser: true }
    )
  ],
  providers: [],
})
export class AppModule {}
