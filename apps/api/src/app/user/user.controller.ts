import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  CreateUserDto,
  IResponse,
  ResponseSuccess,
  ResponseError,
  User,
} from '@pongscore/api-interfaces';

/**
 * User Controller
 *
 * @export
 * @class UserController
 */
@Controller('user')
@ApiTags('user')
export class UserController {
  /**
   * Creates an instance of user controller.
   * @param userService
   */
  constructor(private userService: UserService) {}

  /**
   * Posts user controller
   *  adds a user
   * @param res
   * @param createUserDTO
   * @returns
   */
  @Post('/create')
  @ApiOperation({ summary: 'Create a User' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async addUser(
    @Res() res: Response,
    @Body() createUserDTO: CreateUserDto
  ): Promise<IResponse<User>> {
    try {
      const user = await this.userService.addUser(createUserDTO);
      return new ResponseSuccess('USER.CREATED', user);
    } catch (error) {
      return new ResponseError('USER.ERROR', error);
    }
  }

  /**
   * Gets user controller
   * Retrieve users list
   * @param res
   * @returns
   */
  @Get('users')
  @ApiOperation({ summary: 'Get all Users' })
  async getAllUser(@Res() res: Response) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  /**
   * Gets user controller
   * Fetch a particular user using ID
   * @param res
   * @param userID
   * @returns
   */
  @Get('user/:userID')
  @ApiOperation({ summary: 'Get a User By Id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
  })
  async getUser(@Res() res: Response, @Param('userID') userID: string) {
    const user = await this.userService.getUser(userID);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  /**
   * Puts user controller
   * Update a user's details
   * @param res
   * @param userID
   * @param createUserDTO
   * @returns
   */
  @Put('/update')
  @ApiOperation({ summary: 'Update a User' })
  async updateUser(
    @Res() res: Response,
    @Query('userID') userID: string,
    @Body() createUserDTO: CreateUserDto
  ) {
    const user = await this.userService.updateUser(userID, createUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  /**
   * Deletes user controller
   * Delete a user
   * @param res
   * @param userID
   * @returns
   */
  @Delete('/delete')
  @ApiOperation({ summary: 'Delete a User' })
  async deleteUser(@Res() res: Response, @Query('userID') userID: string) {
    const user = await this.userService.deleteUser(userID);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
