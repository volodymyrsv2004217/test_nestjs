import { Body, Controller, forwardRef, Get, Inject, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { RedisService } from '../redis/redis.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => RedisService))
    private readonly redisService: RedisService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(
      createUserDto.username,
      createUserDto.email,
      createUserDto.firstname,
      createUserDto.lastname,
      createUserDto.nickname,
      createUserDto.city,
      createUserDto.date_of_birth,
      createUserDto.registered_at,
      createUserDto.gender,
      createUserDto.country,
    );
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

  @Get('balance/:id')
  @ApiOperation({ summary: 'Get user balance' })
  @ApiResponse({ status: 200, description: 'Balance retrieved' })
  async getBalance(@Param('id') id: string) {
    const balance = await this.redisService.getBalance(id);
    return { userId: id, balance };
  }
}
