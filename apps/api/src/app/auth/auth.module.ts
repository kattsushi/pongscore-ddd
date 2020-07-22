import { Module, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './auth.controller';
import { CoreModule } from '../core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ForgottenPasswordSchema } from './schemas/forgotten.schema';
import { LoggerMiddleware } from '../core/middlewares/logger.middleware';
import { EmailVerificationSchema } from './schemas/email-verification.schema';
import { ConsentRegistrySchema } from './schemas/consent-registry.schema';
import { JWTService } from './jwt.service';
import { environment } from '../../environments/environment';

/**
 * Auth Module
 *
 * @export
 * @class AuthModule
 */
@Module({
  imports: [
    HttpModule,
    CoreModule,
    UserModule,
    MongooseModule.forFeature([
      { name: 'EmailVerification', schema: EmailVerificationSchema },
      { name: 'ForgottenPassword', schema: ForgottenPasswordSchema },
      { name: 'ConsentRegistry', schema: ConsentRegistrySchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: environment.jwt.secretOrKey,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JWTService],
  exports: [AuthService],
})
export class AuthModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(AuthController);
  }
}
