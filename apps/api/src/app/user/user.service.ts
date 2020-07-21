import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import { CreateUserDto, User } from '@pongscore/api-interfaces';
const saltRounds = 10;
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
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

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
      throw new HttpException('LOGIN.USER_NOT_FOUND', HttpStatus.NOT_FOUND);

    userFromDb.password = await hash(newPassword, saltRounds);

    await userFromDb.save();
    return true;
  }
}
