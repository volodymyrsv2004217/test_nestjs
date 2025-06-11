import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { RedisService } from '../redis/redis.service';

export interface User {
  id: string;
  username: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: Map<string, User> = new Map();

  constructor(
    @Inject(forwardRef(() => RedisService))
    private readonly redisService: RedisService,
  ) {}

  async createUser(username: string, email: string): Promise<User> {
    const id = uuidv4();
    const user: User = { id, username, email };
    this.users.set(id, user);
    await this.redisService.setBalance(id, 1000);
    return user;
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }
}
