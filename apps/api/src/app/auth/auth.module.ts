import { Module, MiddlewareConsumer, HttpModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './infrastructure/auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { AuthController } from './application/auth.controller';
import { CoreModule } from '../core/core.module';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../core/middlewares/logger.middleware';
import { ForgottenPasswordSchema, ForgottenPassword } from './domain/schemas/forgotten.schema';
import { EmailVerification, EmailVerificationSchema } from './domain/schemas/email-verification.schema';
import { ConsentRegistrySchema, ConsentRegistry } from './domain/schemas/consent-registry.schema';
import { JWTService } from './infrastructure/jwt.service';
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
      { name: EmailVerification.name, schema: EmailVerificationSchema },
      { name: ForgottenPassword.name, schema: ForgottenPasswordSchema },
      { name: ConsentRegistry.name, schema: ConsentRegistrySchema },
    ]),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: environment.jwt.secretOrKey,
      signOptions: { expiresIn: environment.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    JWTService,
  ],
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
