import { Controller, Get, UseGuards, Post, Req, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Request } from 'express';
import { LoginUserDto, IResponse, ResponseSuccess, ResponseError, ResetPasswordDto, LoginUserResponse } from '@pongscore/api-interfaces';
import { UserService } from '../user/user.service';

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
    private userService: UserService
  ) { }
  /**
   * Uses guards
   * @param req
   * @returns
   */
  @Post('login')
  @ApiOperation({ summary: 'Do Login' })
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<IResponse> {
    try {
      const res = await this.authService.validateUserByPassword(loginUserDto);
      return new ResponseSuccess('LOGIN.SUCCESS', res);
    } catch (error) {
      return new ResponseError("LOGIN.ERROR", error);
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
  public async getProfile(@Req() req: Request): Promise<IResponse> {
    try {
      return new ResponseSuccess("you did it", null);
    } catch (error) {
      return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
    }
  }


  @Get('email/forgot-password/:email')
  @ApiOperation({ summary: 'Do forgot password' })
  @HttpCode(HttpStatus.OK)
  public async sendEmailForgotPassword(@Param() params: { email: string }): Promise<IResponse> {
    try {
      const isEmailSent = await this.authService.sendEmailForgotPassword(params.email);
      if(isEmailSent){
        return new ResponseSuccess("LOGIN.EMAIL_RESENT", null);
      } else {
        return new ResponseError("REGISTRATION.ERROR.MAIL_NOT_SENT");
      }
    } catch(error) {
      return new ResponseError("LOGIN.ERROR.SEND_EMAIL", error);
    }
  }


  @Post('email/reset-password')
  @ApiOperation({ summary: 'Do Reset Password' })
  @HttpCode(HttpStatus.OK)
  public async setNewPassord(@Body() resetPassword: ResetPasswordDto): Promise<IResponse> {
    try {
      let isNewPasswordChanged = false;
      if(resetPassword.email && resetPassword.currentPassword){
        const isValidPassword = await this.authService.checkPassword(resetPassword.email, resetPassword.currentPassword);
        if(isValidPassword) {
          isNewPasswordChanged = await this.userService.setPassword(resetPassword.email, resetPassword.newPassword);
        } else {
          return new ResponseError("RESET_PASSWORD.WRONG_CURRENT_PASSWORD");
        }
      } else if (resetPassword.newPasswordToken) {
        const forgottenPasswordModel = await this.authService.getForgottenPasswordModel(resetPassword.newPasswordToken);
        if (forgottenPasswordModel) {
          isNewPasswordChanged = await this.userService.setPassword(forgottenPasswordModel.email, resetPassword.newPassword);
          if(isNewPasswordChanged) await forgottenPasswordModel.remove();
        } else {
          return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
        }
      } else {
        return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR");
      }
      return new ResponseSuccess("RESET_PASSWORD.PASSWORD_CHANGED", isNewPasswordChanged);
    } catch(error) {
      return new ResponseError("RESET_PASSWORD.CHANGE_PASSWORD_ERROR", error);
    }
  }
}
