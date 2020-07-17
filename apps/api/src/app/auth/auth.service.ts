import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.interface';
import { LoginUserDto, JwtPayload } from '@pongscore/api-interfaces';

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
    private jwtService: JwtService
  ) { }

  async validateUserByPassword(loginAttempt: LoginUserDto) {
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
  createJwtPayload(user: User) {
    const data: JwtPayload = {
      email: user.email
    };

    const jwt = this.jwtService.sign(data);
    return {
      expiresIn: 3600,
      token: jwt
    };
  }
}
