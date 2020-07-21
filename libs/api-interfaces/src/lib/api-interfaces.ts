import { Document } from 'mongoose';
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

export interface ForgottenPassword extends Document {
  email: string;
  newPasswordToken: string;
  timestamp: Date;
}
/**
 * Iresponse
 */
export interface IResponse {
  success: boolean;
  message: string;
  errorMessage: string;
  data: any;
  error: any;
}
/**
 * Response error
 */
export class ResponseError<T> implements IResponse {
  /**
   * Creates an instance of response error.
   * @param infoMessage
   * @param [data]
   */
  constructor(infoMessage: string, data?: T) {
    this.success = false;
    this.message = infoMessage;
    if (data) {
      this.data = data;
    }
    console.warn(new Date().toString() + ' - [Response]: ' + infoMessage + (data ? ' - ' + JSON.stringify(data) : ''));
  }
  /**
   * Message  of response error
   */
  message: string;
  /**
   * Data  of response error
   */
  /**
   * Data  of response error
   */
  data!: T;
  /**
   * Error message of response error
   */
  errorMessage: any;
  /**
   * Error  of response error
   */
  error: any;
  /**
   * Success  of response error
   */
  success: boolean;
}
/**
 * Response success
 */
export class ResponseSuccess<T> implements IResponse {
  /**
   * Creates an instance of response success.
   * @param infoMessage
   * @param [data]
   * @param [notLog]
   */
  constructor(infoMessage: string, data?: T, notLog?: boolean) {
    this.success = true;
    this.message = infoMessage;
    if (data) this.data = data;
    if (!notLog) {
      try {
        const offuscateRequest = JSON.parse(JSON.stringify(data));
        if (offuscateRequest && offuscateRequest.token) offuscateRequest.token = "*******";
        console.log(new Date().toString() + ' - [Response]: ' + JSON.stringify(offuscateRequest));
      } catch (error) { }
    }
  }
  /**
   * Message  of response success
   */
  message: string;
  /**
   * Data  of response success
   */
  data!: T;
  /**
   * Error message of response success
   */
  errorMessage: any;
  /**
   * Error  of response success
   */
  error: any;
  /**
   * Success  of response success
   */
  success: boolean;
}

/**
 * Reset password dto
 */
export class ResetPasswordDto {
  /**
   * Email  of reset password dto
   */
  readonly email!: string;
  /**
   * New password of reset password dto
   */
  readonly newPassword!: string;
  /**
   * New password token of reset password dto
   */
  readonly newPasswordToken!: string;
  /**
   * Current password of reset password dto
   */
  readonly currentPassword!: string;
}
