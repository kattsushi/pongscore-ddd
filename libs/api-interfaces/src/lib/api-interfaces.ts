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
 * @class CreateUserDto
 */
export class CreateUserDto {
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
export interface IResponse<T> {
  success: boolean;
  message: string;
  errorMessage: string;
  data: T;
  error: any;
}
/**
 * Response error
 */
export class ResponseError<T> implements IResponse<T> {
  /**
   * Creates an instance of response error.
   * @param infoMessage
   * @param [data]
   */
  constructor(infoMessage: string, data?: T) {
    this.success = false;
    this.errorMessage = infoMessage;
    if (data) {
      this.data = data;
    }
    console.warn(
      new Date().toString() +
        ' - [Response]: ' +
        infoMessage +
        (data ? ' - ' + JSON.stringify(data) : '')
    );
  }
  /**
   * Message  of response error
   */
  message!: string;
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
export class ResponseSuccess<T> implements IResponse<T> {
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
        if (offuscateRequest && offuscateRequest.token)
          offuscateRequest.token = '*******';
        console.log(
          new Date().toString() +
            ' - [Response]: ' +
            JSON.stringify(offuscateRequest)
        );
      } catch (error) {}
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
/**
 * Photo
 */
export interface Photo {
  url: string;
  description: string;
  tags: string[];
  date: Date;
}

/**
 * User Interface
 *
 * @export
 * @interface User
 * @extends {Document}
 */
export interface User extends Document {
  roles: string[];
  auth: {
    email: {
      valid: boolean;
    };
    facebook: {
      userid: string;
    };
    gmail: {
      userid: string;
    };
  };
  settings: {};
  photos: {
    profilePic: Photo;
    gallery: Photo[];
  };
  /**
   * Username of create user dto
   */
  readonly username: string;

  /**
   * First name of create user dto
   */
  readonly first_name: string;
  /**
   * Last name of create user dto
   */
  readonly last_name: string;
  /**
   * Email  of create user dto
   */
  readonly email: string;
  /**
   * Phone  of create user dto
   */
  readonly phone: string;
  /**
   * Password  of create user dto
   */
  password: string;
  /**
   * Address  of create user dto
   */
  readonly address: string;
  /**
   * Description  of create user dto
   */
  readonly description: string;
  /**
   * Created at of create user dto
   */
  readonly created_at: Date;
}

export class PhotoDto {
  constructor(object: any = {}) {
    this.url = object.url;
    this.description = object.description;
    this.tags = object.tags;
    this.date = object.date;
  }
  url: string;
  description: string;
  tags: string[];
  date: Date;
}

export class SettingsDto {
  constructor(object: any) {
    object = object || {};
    this.email = object.email;
  }
  readonly email: string;
}

export class UserDto {
  constructor(object: any) {
    this.first_name = object.first_name;
    this.last_name = object.last_name;
    this.email = object.email;
    // this.settings = new SettingsDto(object.settings);
    // this.photos = {
    //   profilePic : new PhotoDto(object.photos.profilePic),
    //   gallery: []
    // };
    // if(object.photos && object.photos.gallery) {
    //   object.photos.gallery.forEach((photo: any) => {
    //     this.photos.gallery.push(new PhotoDto(photo));
    //   });
    // }
  }
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  settings!: SettingsDto;
  photos!: {
    profilePic: PhotoDto;
    gallery: PhotoDto[];
  };
}
/**
 * Email verification
 */
export interface EmailVerification extends Document {
  email: string;
  emailToken: string;
  timestamp: Date;
}
/**
 * Consent registry
 */
export interface ConsentRegistry extends Document {
  email: string;
  registrationForm: string[];
  checkboxText: string;
  date: Date;
  privacyPolicy: string;
  cookiePolicy: string;
  acceptedPolicy: string;
}
