import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { isEmail } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({
    summary: 'Create user',
    description:
      'Create new user with necessary information to create a user, such as username, password, and email.',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            phone: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 409,
    description: 'Username already exists',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    try {
      if (
        !createUserDto ||
        !createUserDto.username ||
        !createUserDto.password ||
        !createUserDto.email ||
        isEmail(createUserDto.email) === false
      ) {
        throw new BadRequestException('Invalid input');
      }
      return this.userService.create(createUserDto);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({
    summary: 'Login user',
    description: 'Login user with username and password.',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully.',
    content: {
      access_token: {
        schema: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiQuery({
    required: true,
    type: [LoginUserDto],
    description: 'The username of the user',
  })
  @Get('/login')
  login(@Query() loginUserDto: LoginUserDto) {
    try {
      if (!loginUserDto || !loginUserDto.username || !loginUserDto.password) {
        throw new BadRequestException('Invalid input');
      }
      return this.authService.signIn(
        loginUserDto.username,
        loginUserDto.password,
      );
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({
    summary: 'Logout user',
    description: 'Logs out current logged in user session',
  })
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully.',
  })
  @Get('/logout')
  logout() {
    return this.userService.logout();
  }

  @ApiOperation({
    summary: 'Get user by user name',
    description:
      'Find user with username and return user information such as username and email.',
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid username supplied',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiQuery({
    name: 'username',
    type: String,
    required: true,
    description: 'The username of the user to retrieve',
  })
  @Get('/:username')
  findOne(@Param('username') username: string) {
    try {
      return this.userService.findOne(username);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({
    summary: 'Update user',
    description:
      'Update user information with username. This can only be done by the logged in user.',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            firstName: {
              type: 'string',
            },
            lastName: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid input',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
    description: 'The username of the user to update',
  })
  @Patch('/:username')
  update(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.userService.update(username, updateUserDto);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user with username.',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid username supplied',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @ApiParam({
    name: 'username',
    type: String,
    required: true,
    description: 'The username of the user to delete',
  })
  @Delete('/:username')
  remove(@Param('username') username: string) {
    try {
      if (!username) throw new BadRequestException('Invalid username supplied');
      return this.userService.remove(username);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(
          {
            status: e.getStatus(),
            error: e.message,
          },
          e.getStatus(),
        );
      } else {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
