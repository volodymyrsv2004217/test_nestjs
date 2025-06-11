import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  createUser(@Body() body: { username: string; email: string }) {
    return this.usersService.createUser(body.username, body.email);
  }

  @Get('me/:id')
  @ApiOperation({ summary: 'Get user information' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  getMe(@Param('id') id: string) {
    const user = this.usersService.getUser(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
