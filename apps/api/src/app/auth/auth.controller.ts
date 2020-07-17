import { Controller, Get, UseGuards, Post, Req, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { Request } from 'express';
import { LoginUserDto } from '@pongscore/api-interfaces';
import { LocalAuthGuard } from './guards/local-auth.guard';

interface RequestWithUser extends Request {
  user: LoginUserDto;
}
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
  constructor(private authService: AuthService) {}
  /**
   * Uses guards
   * @param req
   * @returns
   */
  @Post('login')
  @ApiOperation({ summary: 'Do Login' })
  async login(@Body() loginUserDto: LoginUserDto) {
    console.log('DTO', JSON.stringify(loginUserDto));
    return this.authService.validateUserByPassword(loginUserDto);
  }
  /**
   * Uses guards
   * @param req
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOperation({ summary: 'Get a Profile' })
  getProfile(@Req() req: Request) {
    return {
      message: 'You did it'
    };
  }
}
