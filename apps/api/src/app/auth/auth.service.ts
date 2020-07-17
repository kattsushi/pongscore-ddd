import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.interface';

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
  constructor(private usersService: UserService, private jwtService: JwtService) {  }

  /**
   * Validates user
   * @param username
   * @param pass
   * @returns User
   */
  async validateUser(username: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  /**
   * Logins auth service
   * @param user
   * @returns
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
