import { Model } from 'mongoose';
import { Injectable, UnauthorizedException, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { LoginUserDto, JwtPayload, LoginUserResponse, ForgottenPassword } from '@pongscore/api-interfaces';
import { environment } from './../../environments/environment';
import { UserService } from '../user/user.service';

import { User } from '../user/user.interface';
import { MailerService, MailOptions } from '../core/mailer/mailer.service';

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
    private usersService: UserService,
    private jwtService: JwtService,
    private mailer: MailerService,
    @InjectModel('ForgottenPassword') private readonly forgottenPasswordModel: Model<ForgottenPassword>,
  ) { }

  async validateUserByPassword(loginAttempt: LoginUserDto): Promise<LoginUserResponse> {
    // This will be used for the initial login
    const userToAttempt: any = await this.usersService.findOneByEmail(loginAttempt.email);
    return new Promise((resolve) => {
      if (!userToAttempt) throw new UnauthorizedException();
      // Check the supplied password against the hash stored for this email address
      userToAttempt.checkPassword(loginAttempt.password, (err: any, isMatch: boolean) => {
        if (err) throw new UnauthorizedException();
        if (isMatch) {
          // If there is a successful match, generate a JWT for the user
          resolve(this.createJwtPayload(userToAttempt));
        } else {
          throw new UnauthorizedException();
        }
      });
    });
  }
  /**
   * Validates user by jwt
   * @param payload
   * @returns
   */
  async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the user has already logged in and has a JWT
    const user = await this.usersService.findOneByEmail(payload.email);
    if (user) {
      return this.createJwtPayload(user);
    } else {
      throw new UnauthorizedException();
    }
  }
  /**
   * Creates jwt payload
   * @param user
   * @returns
   */
  createJwtPayload(user: User): LoginUserResponse {
    const data: JwtPayload = {
      email: user.email
    };

    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt
    };
  }
  /**
   * Creates forgotten password token
   * @param email
   * @returns forgotten password token
   */
  async createForgottenPasswordToken(email: string): Promise<ForgottenPassword> {
    const forgottenPassword = await this.forgottenPasswordModel.findOne({ email: email });
    if (forgottenPassword && ((new Date().getTime() - forgottenPassword.timestamp.getTime()) / 60000 < 15)) {
      throw new HttpException('RESET_PASSWORD.EMAIL_SENDED_RECENTLY', HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
      const forgottenPasswordModel = await this.forgottenPasswordModel.findOneAndUpdate(
        { email: email },
        {
          email: email,
          newPasswordToken: (Math.floor(Math.random() * (9000000)) + 1000000).toString(), //Generate 7 digits number,
          timestamp: new Date()
        },
        { upsert: true, new: true }
      );
      if (forgottenPasswordModel) {
        return forgottenPasswordModel;
      } else {
        throw new HttpException('LOGIN.ERROR.GENERIC_ERROR', HttpStatus.INTERNAL_SERVER_ERROR);
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
    if (!userFromDb) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    const tokenModel = await this.createForgottenPasswordToken(email);

    if (tokenModel && tokenModel.newPasswordToken) {
      const mailOptions: MailOptions = {
        from: '"Company" <' + environment.mail.user + '>',
        to: email, // list of receivers (separated by ,)
        subject: 'Frogotten Password',
        text: 'Forgot Password',
        html: `
          Hi! <br><br> If you requested to reset your password<br><br>
          <a href=${environment.host.url}:${environment.host.port}/auth/email/reset-password/${tokenModel.newPasswordToken}>
            Click here
          </a>
        `  // html body
      };
      return this.mailer.mail(mailOptions);
    } else {
      throw new HttpException('REGISTER.USER_NOT_REGISTERED', HttpStatus.FORBIDDEN);
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
    if (!userFromDb) throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    return await compare(password, userFromDb.password);
  }

  /**
   * Gets forgotten password model
   * @param newPasswordToken
   * @returns forgotten password model
   */
  async getForgottenPasswordModel(newPasswordToken: string): Promise<ForgottenPassword | null> {
    return await this.forgottenPasswordModel.findOne({ newPasswordToken: newPasswordToken });
  }
}
