import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { HttpService, HttpModule } from '@nestjs/common';
import { UserService } from '../../user/infrastructure/user.service';
import { JWTService } from './jwt.service';
import { MailerService } from '../../core/mailer/mailer.service';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { environment } from '../../../environments/environment';
import { CoreModule } from './../../core/core.module';
import { UserModule } from './../../user/user.module';

import { ForgottenPasswordSchema, ForgottenPassword } from './../domain/schemas/forgotten.schema';
import { EmailVerificationSchema, EmailVerification } from './../domain/schemas/email-verification.schema';
import { ConsentRegistrySchema, ConsentRegistry } from './../domain/schemas/consent-registry.schema';
import { of } from 'rxjs';
import { User } from '../../user/domain/user.schema';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        CoreModule,
        UserModule,
        // MongooseModule.forFeature([
        //   { name: 'EmailVerification', schema: EmailVerificationSchema },
        //   { name: 'ForgottenPassword', schema: ForgottenPasswordSchema },
        //   { name: 'ConsentRegistry', schema: ConsentRegistrySchema },
        // ]),
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
          secret: environment.jwt.secretOrKey,
          signOptions: { expiresIn: environment.jwt.expiresIn },
        })
      ],
      providers: [
        AuthService,
        {
          provide: HttpService,
          useValue: {
            get: () => of({})
          }
        },
        {
          provide: UserService,
          useValue: {}
        },
        {
          provide: JWTService,
          useValue: {}
        },
        {
          provide: getModelToken(ConsentRegistry.name),
          useValue: {},
        },
        {
          provide: getModelToken(EmailVerification.name),
          useValue: {},
        },
        {
          provide: getModelToken(ForgottenPassword.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        }
      ],
    }).compile();

    service = await module.resolve<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
