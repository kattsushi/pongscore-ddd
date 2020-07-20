/**
 * Login user Response
 */
export class LoginUserResponse {
  /**
   * Expires in of login user response
   */
  readonly expiresIn: number | undefined;
  /**
   * Token  of login user response
   */
  readonly token: string | undefined;
}

/**
 * Login user dto
 */
export class LoginUserDto {
  /**
   * Email  of login user dto
   */
  readonly email: string | undefined;
  /**
   * Password  of login user dto
   */
  readonly password: string | undefined;
}

/**
 * CreateUser DTO
 *
 * @export
 * @class CreateUserDTO
 */
export class CreateUserDTO {
  /**
   * First name of create user dto
   */
  readonly first_name!: string;
  /**
   * Last name of create user dto
   */
  readonly last_name!: string;
  /**
   * Email  of create user dto
   */
  readonly email!: string;
  /**
   * Phone  of create user dto
   */
  readonly phone!: string;
  /**
   * Password  of create user dto
   */
  readonly password!: string;
  /**
   * Address  of create user dto
   */
  readonly address!: string;
  /**
   * Description  of create user dto
   */
  readonly description!: string;
  /**
   * Created at of create user dto
   */
  readonly created_at!: Date;
}

/**
 * Jwt payload
 */
export interface JwtPayload {
  /**
   * email
   */
  email: string;
}
