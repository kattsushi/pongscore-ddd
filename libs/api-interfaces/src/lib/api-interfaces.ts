/**
 * Message
 */
export interface Message {
  message: string;
}
/**
 * Login user dto
 */
export class LoginUserDto {
  readonly email: string | undefined;
  readonly password: string | undefined;
}

/**
 * Jwt payload
 */
export interface JwtPayload {
  email: string;
}
