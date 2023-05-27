import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpStatus,
  HttpException,
  Put,
  Req,
  Request,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/user.entity';
import { Roles } from './decorators/roles.decorator';
import { Public } from './decorators/public.decorator';
import { RolesGuard } from './roles.guard';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Retrieves all users in the system. Requires admin role.
   * @returns {Promise<Auth[]>} A list of all users in the system.
   * @throws {UnauthorizedException} If the user does not have admin role.
   */
  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * Defines a new route for user registration.
   * @param {CreateAuthDto} createAuthDto - The data for creating a new user account.
   * @returns {Promise<{ user: Auth }>} The newly created user account.
   */
  @Public()
  @Post('register')
  async register(@Body() createAuthDto: CreateUserDto) {
    // Check if email is already registered
    const existingUser = await this.userService.findByEmail(
      createAuthDto.email,
    );
    if (existingUser) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.register(createAuthDto);
    return { user };
  }

  /**
Logs in a user and returns a JWT token if the login credentials are valid.
@param {LoginUserDto} loginUserDto - The DTO containing the user's login credentials.
@returns {Object} An object containing the JWT token.
@throws {HttpException} If the login credentials are invalid.
*/
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto) {
    if (!loginUserDto) {
      throw new HttpException('Invalid request body', HttpStatus.BAD_REQUEST);
    }

    const token = await this.userService.login(loginUserDto);
    if (!token) {
      throw new HttpException(
        'Invalid login credentials',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { token };
  }

  /**
   * Returns the authenticated user's profile.
   * @param {Request} req - The request object containing the authenticated user's information.
   * @returns {Object} An object representing the authenticated user's profile.
   */
  @Get('profile')
  getProfile(@Request() req) {
    return req['user'];
  }

  @Put(':id')
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin, Role.Guest)
  async updateUser(
    @Param('id') id: string,
    @Body() UpdateAuthDto: any,
    @Req() req,
  ) {
    const userId = id;

    return this.userService.updateUser(userId, UpdateAuthDto, req.user.role);
  }

  /**
   * Updates user password if old password is correct.
   * @param {string} oldPassword - The user's current password.
   * @param {string} newPassword - The user's desired new password.
   * @param {Request} req - The request object.
   * @returns {Promise<any>} A promise that resolves to the result of the update operation.
   */
  @Patch('update-password')
  async changePassword(
    @Body('oldPassword') oldPassword: string,
    @Body('newPassword') newPassword: string,
    @Request() req,
  ) {
    console.log(req.body);
    const userId = req.user.id;
    // Call the changePassword method on the AuthService
    const result = await this.userService.updateUserPassword(
      userId,
      oldPassword,
      newPassword,
    );

    return result;
  }

  /**
   * Deletes a user by ID.
   * @param {Request} req - The request object.
   * @param {string} userId - The ID of the user to delete.
   * @returns {Object} An object with a success message.
   * @throws {UnauthorizedException} If the user is not authorized to delete users.
   */
  @Delete(':userId')
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  async deleteUser(@Request() req, @Param('userId') userId: string) {
    const deletedUser = await this.userService.deleteUser(
      userId,
      req.user.role,
    );
    return {
      message: `User ${deletedUser.name} has been deleted successfully!`,
    };
  }

  // Retrieves a user by their ID
  // @param {string} id - The ID of the user to retrieve
  // @returns {Promise<Auth>} The user with the specified ID
  // @throws {NotFoundException} If the user with the specified ID is not found
  @Get(':id') // Defines a new route with a dynamic parameter "id"
  @UseGuards(RolesGuard)
  @Roles(Role.Admin, Role.Guest) // Allows both admin and regular users to access this route
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.getUser(id); // Calls the "getUser" method in the "AuthService" and returns the result
  }
}
