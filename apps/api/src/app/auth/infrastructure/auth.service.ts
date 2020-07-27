import {
  Injectable,
  HttpStatus,
  HttpException,
  HttpService,
} from '@nestjs/common';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { Model } from 'mongoose';
import {
  LoginUserDto,
  ForgottenPassword,
  EmailVerification,
} from '@pongscore/api-interfaces';

import { environment } from './../../../environments/environment';
import { UserService } from '../../user/infrastructure/user.service';
import { CoreMailerService } from '../../core/mailer/mailer.service';
import { JWTService } from './jwt.service';
import { ConsentRegistry } from '../domain/schemas/consent-registry.schema';
import { Translations } from '../../core/translations/translations.service';

/**
 * Auth Service
 *
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {
  /**
   * Creates an instance of auth service.
   * @param usersService
   * @param jwtService
   */
  constructor(
    private httpService: HttpService,
    private usersService: UserService,
    private jwtService: JWTService,
    private mailer: CoreMailerService,
    private translations: Translations,
    @InjectModel('EmailVerification')
    private readonly emailVerificationModel: Model<EmailVerification>,
    @InjectModel(ConsentRegistry.name)
    private readonly consentRegistryModel: Model<ConsentRegistry>,
    @InjectModel('ForgottenPassword')
    private readonly forgottenPasswordModel: Model<ForgottenPassword>
  ) {}

  async validateLogin({
    email,
    password,
  }: LoginUserDto): Promise<{ token: string }> {
    const userFromDb = await this.usersService.findOneByEmail(email);
    if (!userFromDb)
      throw new HttpException(this.translations.AUTH.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    if (!userFromDb.auth.email.valid)
      throw new HttpException(this.translations.AUTH.ERROR.EMAIL_NOT_VERIFIED, HttpStatus.FORBIDDEN);

    const isValidPass = await compare(password, userFromDb.password);
    if (isValidPass) {
      const accessToken = await this.jwtService.createToken(
        email,
        userFromDb.roles
      );
      return { token: accessToken.access_token };
    } else {
      throw new HttpException(
        this.translations.AUTH.ERROR.WRONG_PASSWORD,
        HttpStatus.UNAUTHORIZED
      );
    }
  }
  /**
   * Creates forgotten password token
   * @param email
   * @returns forgotten password token
   */
  async createForgottenPasswordToken(
    email: string
  ): Promise<ForgottenPassword> {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({
      email: email,
    });
    if (
      forgottenPassword &&
      (new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new HttpException(
        this.translations.AUTH.ERROR.EMAIL_SENDED_RECENTLY,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } else {
      const forgottenPasswordModel = await this.forgottenPasswordModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          newPasswordToken: (
            Math.floor(Math.random() * 9000000) + 1000000
          ).toString(), //Generate 7 digits number,
          timestamp: new Date(),
        },
        { upsert: true, new: true }
      );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException(
          this.translations.AUTH.ERROR.GENERIC_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    }
  }
  /**
   * Sends email forgot password
   * @param email
   * @returns email forgot password
   */
  async sendEmailForgotPassword(email: string): Promise<boolean> {
    const userFromDb = await this.usersService.findOneByEmail(email);
    if (!userFromDb)
      throw new HttpException(this.translations.AUTH.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    const tokenModel = await this.createForgottenPasswordToken(email);
    console.log('TOken', tokenModel);
    if (tokenModel && tokenModel.newPasswordToken) {
      const mailOptions: ISendMailOptions = {
        from: '"Company" <' + environment.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Frogotten Password',
        text: 'Forgot Password',
        context: {
          url: environment.host.url,
          port: environment.host.port,
          email: email,
          newPasswordToken: tokenModel.newPasswordToken,
        },
        template: 'forgotten-password.template.html', // html body
      };
      return this.mailer
        .mail(mailOptions)
        .catch((error) => console.log('ERROR', error));
    } else {
      throw new HttpException(
        this.translations.AUTH.ERROR.USER_NOT_REGISTERED,
        HttpStatus.FORBIDDEN
      );
    }
  }
  /**
   * Checks password
   * @param email
   * @param password
   * @returns
   */
  async checkPassword(email: string, password: string) {
    const userFromDb = await this.usersService.findOneByEmail(email);
    if (!userFromDb)
      throw new HttpException(this.translations.AUTH.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return await compare(password, userFromDb.password);
  }

  /**
   * Gets forgotten password model
   * @param newPasswordToken
   * @returns forgotten password model
   */
  async getForgottenPasswordModel(
    newPasswordToken: string
  ): Promise<ForgottenPassword | null> {
    return await this.forgottenPasswordModel.findOne({
      newPasswordToken: newPasswordToken,
    });
  }

  /**
   * Creates email token
   * @param email
   * @returns email token
   */
  async createEmailToken(email: string): Promise<boolean> {
    const emailVerification = await this.emailVerificationModel.findOne({
      email: email,
    });
    if (
      emailVerification &&
      (new Date().getTime() - emailVerification.timestamp.getTime()) / 60000 <
        15
    ) {
      throw new HttpException(
        this.translations.AUTH.ERROR.EMAIL_SENDED_RECENTLY,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    } else {
      const emailVerificationModel = await this.emailVerificationModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          emailToken: (
            Math.floor(Math.random() * 9000000) + 1000000
          ).toString(), //Generate 7 digits number
          timestamp: new Date(),
        },
        { upsert: true }
      );
      return true;
    }
  }
  /**
   * Saves user consent
   * @param email
   * @returns user consent
   */
  async saveUserConsent(email: string): Promise<ConsentRegistry> {
    try {
      const newConsent = new this.consentRegistryModel();
      newConsent.email = email;
      newConsent.date = new Date();
      newConsent.registrationForm = [
        'first_name',
        'last_name',
        'email',
        'password',
      ];
      newConsent.checkboxText = 'I accept privacy policy';
      const privacyPolicyResponse: any = await this.httpService
        .get('https://www.XXXXXX.com/api/privacy-policy')
        .toPromise();
      newConsent.privacyPolicy = privacyPolicyResponse.data.content;
      const cookiePolicyResponse: any = await this.httpService
        .get('https://www.XXXXXX.com/api/privacy-policy')
        .toPromise();
      newConsent.cookiePolicy = cookiePolicyResponse.data.content;
      newConsent.acceptedPolicy = 'Y';
      return await newConsent.save();
    } catch (error) {
      console.error(error);
      return error;
    }
  }
  /**
   * Sends email verification
   * @param email
   * @returns email verification
   */
  async sendEmailVerification(email: string): Promise<boolean> {
    const model = await this.emailVerificationModel.findOne({ email: email });

    if (model && model.emailToken) {
      const mailOptions: ISendMailOptions = {
        from: `Company<${environment.mail.user}>`,
        to: email, // list of receivers (separated by ,)
        subject: 'Verify Email',
        text: 'Verify Email',
        context: {
          email: email,
          url: environment.host.url,
          port: environment.host.port,
          emailToken: model.emailToken,
        },
        template: 'verification.template.html',
      };

      return this.mailer.mail(mailOptions);
    } else {
      throw new HttpException(
        this.translations.AUTH.ERROR.USER_NOT_REGISTERED,
        HttpStatus.FORBIDDEN
      );
    }
  }

  /**
   * Verifys email
   * @param token
   * @returns email
   */
  async verifyEmail(token: string): Promise<boolean> {
    const emailVerif: EmailVerification | null = await this.emailVerificationModel.findOne(
      { emailToken: token }
    );
    if (emailVerif && emailVerif.email) {
      const userFromDb = await this.usersService.findOneByEmail(
        emailVerif.email
      );
      if (userFromDb) {
        console.log('tokentokentoken', userFromDb);
        userFromDb.auth.email.valid = true;
        const savedUser = await userFromDb.save();
        console.log('emailVerif', emailVerif);
        console.log('savedUser', savedUser);
        await emailVerif.remove();

        return !!savedUser;
      } else {
        return false;
      }
    } else {
      throw new HttpException(
        this.translations.AUTH.ERROR.EMAIL_CODE_NOT_VALID,
        HttpStatus.FORBIDDEN
      );
    }
  }
}
