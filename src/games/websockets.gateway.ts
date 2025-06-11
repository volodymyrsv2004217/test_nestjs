import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from '../redis/redis.service';
import { forwardRef, Inject, Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, transports: ['websocket'] })
export class WebsocketsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger = new Logger(WebsocketsGateway.name);

  constructor(
    @Inject(forwardRef(() => RedisService))
    private readonly redisService: RedisService,
  ) {
    this.logger.log('WebsocketsGateway initialized with RedisService');
  }

  async handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}, Headers: ${JSON.stringify(client.handshake.headers)}`);
    try {
      await this.redisService.getBalance('test-user');

      this.logger.log('Redis connection tested successfully');
    } catch (error) {
      this.logger.error(`Redis connection failed: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async updateBalance(userId: string, balance: number) {
    this.server.emit('balanceUpdate', { userId, balance });
    this.logger.log(`Balance update sent for user ${userId}: ${balance}`);
  }
}
