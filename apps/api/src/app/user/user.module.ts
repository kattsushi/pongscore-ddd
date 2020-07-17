import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
/**
 * User Module
 *
 * @export
 * @class UserModule
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
