import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JWTService } from '../jwt.service';
import { environment } from '../../../../environments/environment';
/**
 * Jwt Strategy
 *
 * @export
 * @class JwtStrategy
 * @extends {PassportStrategy(Strategy)}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * Creates an instance of jwt strategy.
   */
  constructor(private readonly jwtService: JWTService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: environment.jwt.secretOrKey,
    });
  }

  /**
   * Validates jwt strategy
   * @param payload
   * @returns
   */
  public async validate(payload: any, req: any, done: Function) {
    const user = await this.jwtService.validateUser(req);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
