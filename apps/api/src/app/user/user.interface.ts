import { Document } from 'mongoose';
/**
 * User Interface
 *
 * @export
 * @interface User
 * @extends {Document}
 */
export interface User extends Document {

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
