import {
  Controller,
  Get,
  UseGuards,
  Post,
  Req,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import {
  LoginUserDto,
  IResponse,
  ResponseSuccess,
  ResponseError,
  ResetPasswordDto,
  CreateUserDto,
  UserDto,
} from '@pongscore/api-interfaces';

import { AuthService } from './../infrastructure/auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from '../../user/infrastructure/user.service';
import { Translations } from '../../core/translations/translations.service';

/**
 * Auth Controller
 * @export
 * @class AuthController
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  /**
   * Creates an instance of auth controller.
   * @param authService
   */
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private translations: Translations
  ) {}
  /**
   * Uses guards
   * @param req
   * @returns
   */
  @Post('email/login')
  @ApiOperation({ summary: 'Do Login' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<IResponse<any>> {
    try {
      const res = await this.authService.validateLogin(loginUserDto);

      return new ResponseSuccess(this.translations.AUTH.SUCCESS.LOGIN, res);
    } catch (error) {
      throw new HttpException(
        new ResponseError(this.translations.AUTH.ERROR.LOGIN, error),
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  /**
   * Posts auth controller
   * @param createUserDto
   * @returns register
   */
  @Post('email/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() createUserDto: CreateUserDto
  ): Promise<IResponse<any>> {
    try {
      const newUser = new UserDto(
        await this.userService.createNewUser(createUserDto)
      );
      await this.authService.createEmailToken(newUser.email);
      await this.authService.saveUserConsent(newUser.email);
      const sent = await this.authService.sendEmailVerification(newUser.email);
      if (sent) {
        return new ResponseSuccess(this.translations.AUTH.SUCCESS.USER_REGISTERED_SUCCESSFULLY);
      } else {
        throw new HttpException(
          new ResponseError(this.translations.AUTH.ERROR.MAIL_NOT_SENT, false),
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
    } catch (error) {
      throw new HttpException(
        new ResponseError(this.translations.AUTH.ERROR.GENERIC_ERROR, error),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  /**
   * Gets auth controller
   * @param params
   * @returns email
   */
  @Get('email/verify/:token')
  public async verifyEmail(
    @Param() params: { token: string }
  ): Promise<IResponse<boolean>> {
    try {
      const isEmailVerified = await this.authService.verifyEmail(params.token);
      return new ResponseSuccess(this.translations.AUTH.SUCCESS.EMAIL_VERIFIED, isEmailVerified);
    } catch (error) {
      throw new HttpException(
        new ResponseError(this.translations.AUTH.ERROR.GENERIC_ERROR, error),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  /**
   * Uses guards
   * @param req
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get a Profile' })
  @HttpCode(HttpStatus.OK)
  public async getProfile(@Req() req: Request): Promise<IResponse<null>> {
    try {
      return new ResponseSuccess('you did it', null);
    } catch (error) {
      return new ResponseError(this.translations.AUTH.ERROR.GENERIC_ERROR, error);
    }
  }

  @Get('email/forgot-password/:email')
  @ApiOperation({ summary: 'Do forgot password' })
  @HttpCode(HttpStatus.OK)
  public async sendEmailForgotPassword(
    @Param() params: { email: string }
  ): Promise<IResponse<null>> {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(
        params.email
      );
      if (isEmailSent) {
        return new ResponseSuccess(this.translations.AUTH.SUCCESS.EMAIL_RESENT, null);
      } else {
        return new ResponseError(this.translations.AUTH.ERROR.MAIL_NOT_SENT);
      }
    } catch (error) {
      throw new HttpException(
        new ResponseError(this.translations.AUTH.ERROR.MAIL_NOT_SENT, error),
        HttpStatus.UNAUTHORIZED
      );
    }
  }

  @Post('email/reset-password')
  @ApiOperation({ summary: 'Do Reset Password' })
  @HttpCode(HttpStatus.OK)
  public async setNewPassord(
    @Body() resetPassword: ResetPasswordDto
  ): Promise<IResponse<boolean>> {
    try {
      let isNewPasswordChanged = false;

      if (resetPassword.email && resetPassword.currentPassword) {
        const isValidPassword = await this.authService.checkPassword(
          resetPassword.email,
          resetPassword.currentPassword
        );
        if (isValidPassword) {
          isNewPasswordChanged = await this.userService.setPassword(
            resetPassword.email,
            resetPassword.newPassword
          );
        } else {
          throw new HttpException(
            new ResponseError(this.translations.AUTH.ERROR.WRONG_CURRENT_PASSWORD, false),
            HttpStatus.NOT_ACCEPTABLE
          );
        }
      } else if (resetPassword.newPasswordToken) {
        const forgottenPasswordModel = await this.authService.getForgottenPasswordModel(
          resetPassword.newPasswordToken
        );
        if (forgottenPasswordModel) {
          isNewPasswordChanged = await this.userService.setPassword(
            forgottenPasswordModel.email,
            resetPassword.newPassword
          );
          if (isNewPasswordChanged) await forgottenPasswordModel.remove();
        } else {
          throw new HttpException(
            new ResponseError(this.translations.AUTH.ERROR.CHANGE_PASSWORD_ERROR, false),
            HttpStatus.INTERNAL_SERVER_ERROR
          );
        }
      } else {
        throw new HttpException(
          new ResponseError(this.translations.AUTH.ERROR.CHANGE_PASSWORD_ERROR, false),
          HttpStatus.INTERNAL_SERVER_ERROR
        );
      }
      return new ResponseSuccess(
        this.translations.AUTH.SUCCESS.PASSWORD_CHANGED,
        isNewPasswordChanged
      );
    } catch (error) {
      throw new HttpException(
        new ResponseError(this.translations.AUTH.ERROR.CHANGE_PASSWORD_ERROR, error),
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
