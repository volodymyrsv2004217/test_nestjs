import { Module, forwardRef } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { HttpModule } from '@nestjs/axios';
import { RedisModule } from '../redis/redis.module';
import { WebsocketsGateway } from './websockets.gateway';

@Module({
  imports: [HttpModule, forwardRef(() => RedisModule)],
  providers: [GamesService, WebsocketsGateway],
  controllers: [GamesController],
  exports: [WebsocketsGateway], // Add this line to export the gateway
})
export class GamesModule {}
