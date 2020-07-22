import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { environment } from '../../environments/environment';
import { User } from '@pongscore/api-interfaces';
import { UserService } from '../user/user.service';

@Injectable()
export class JWTService {
  constructor(private userService: UserService) {}

  async createToken(email: string | undefined, roles: string[]) {
    const expiresIn = environment.jwt.expiresIn,
      secretOrKey = environment.jwt.secretOrKey;
    const userInfo = { email: email, roles: roles };
    const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      access_token: token,
    };
  }

  async validateUser(signedUser: any): Promise<User | null> {
    const userFromDb = await this.userService.findOneByEmail(signedUser.email);
    if (userFromDb) {
      return userFromDb;
    }
    return null;
  }
}
