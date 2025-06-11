import { Module, forwardRef } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ConfigModule, forwardRef(() => GamesModule), forwardRef(() => UsersModule)],
  providers: [RedisService],
  exports: [RedisService], // This is correct and should stay
})
export class RedisModule {}
