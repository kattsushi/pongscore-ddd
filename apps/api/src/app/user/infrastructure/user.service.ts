import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hash } from 'bcrypt';
import { CreateUserDto } from '@pongscore/api-interfaces';

import { saltRounds } from '../../auth/infrastructure/constants';
import { User } from './../domain/user.schema';
import { Translations } from '../../core/translations/translations.service';

/**
 * User Service
 *
 * @export
 * @class UserService
 */
@Injectable()
export class UserService {
  /**
   * Creates an instance of user service.
   * @param userModel
   */
  constructor(
    private translations: Translations,
    @InjectModel(User.name) private readonly userModel: Model<User>) {}

  /**
   * Finds one
   * @param username
   * @returns one
   */
  async findOne(username: string): Promise<User | null> {
    const user = await this.userModel.findOne({ username: username });
    return user;
  }

  async findOneByEmail(email: string | undefined): Promise<User | null> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  /**
   * Gets all users
   * @returns all users
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  /**
   * Gets user
   * @param userID
   * @returns user
   */
  async getUser(userID: string): Promise<User | null> {
    const user = await this.userModel.findById(userID).exec();
    return user;
  }

  /**
   * Adds user
   * @param createUserDTO
   * @returns user
   */
  async addUser(createUserDTO: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }

  /**
   * Updates user
   * @param userID
   * @param createUserDTO
   * @returns user
   */
  async updateUser(
    userID: string,
    createUserDTO: CreateUserDto
  ): Promise<User | null> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userID,
      createUserDTO,
      { new: true }
    );
    return updatedUser;
  }
  /**
   * Deletes user
   * @param userID
   * @returns user
   */
  async deleteUser(userID: string): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }
  /**
   * Sets password
   * @param email
   * @param newPassword
   * @returns password
   */
  async setPassword(email: string, newPassword: string): Promise<boolean> {
    const userFromDb = await this.userModel.findOne({ email: email });
    if (!userFromDb)
      throw new HttpException(this.translations.AUTH.ERROR.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    userFromDb.password = await hash(newPassword, saltRounds);

    await userFromDb.save();
    return true;
  }

  isValidEmail(email: string) {
    if (email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    } else return false;
  }

  async createNewUser(newUser: CreateUserDto): Promise<User> {
    if (this.isValidEmail(newUser.email) && newUser.password) {
      const userRegistered = await this.findOneByEmail(newUser.email);
      if (!userRegistered) {
        newUser.password = await hash(newUser.password, saltRounds);
        const createdUser = new this.userModel(newUser);
        createdUser.roles = ['User'];
        return await createdUser.save();
      } else if (!userRegistered.auth.email.valid) {
        return userRegistered;
      } else {
        throw new HttpException(
          this.translations.AUTH.ERROR.USER_ALREADY_REGISTERED,
          HttpStatus.FORBIDDEN
        );
      }
    } else {
      throw new HttpException(
        this.translations.AUTH.ERROR.MISSING_MANDATORY_PARAMETERS,
        HttpStatus.FORBIDDEN
      );
    }
  }
}
