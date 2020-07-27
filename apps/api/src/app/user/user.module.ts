import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './infrastructure/user.service';
import { UserController } from './application/user.controller';
import { UserSchema, User } from './domain/user.schema';
import { CoreModule } from '../core/core.module';
/**
 * User Module
 *
 * @export
 * @class UserModule
 */
@Module({
  imports: [
    CoreModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
