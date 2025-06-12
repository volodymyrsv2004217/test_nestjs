import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../redis/redis.service';
import { User } from './interfaces/users.interface';

@Injectable()
export class UsersService {
  private users: Map<string, User> = new Map();

  constructor(
    @Inject(forwardRef(() => RedisService))
    private readonly redisService: RedisService,
  ) {}

  async createUser(
    username: string,
    email: string,
    firstname: string,
    lastname: string,
    nickname: string,
    city: string,
    date_of_birth: string,
    registered_at: string,
    gender: 'm' | 'f',
    country: string,
  ): Promise<User> {
    const id = uuidv4();
    const user: User = {
      id,
      username,
      email,
      firstname,
      lastname,
      nickname,
      city,
      date_of_birth,
      registered_at,
      gender,
      country,
    };
    this.users.set(id, user);
    await this.redisService.setBalance(id, 1000);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }
}
