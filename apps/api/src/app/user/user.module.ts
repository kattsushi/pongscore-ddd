import { Module } from '@nestjs/common';
import { UserService } from './infrastructure/user.service';
import { UserController } from './application/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './domain/user.schema';
/**
 * User Module
 *
 * @export
 * @class UserModule
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
