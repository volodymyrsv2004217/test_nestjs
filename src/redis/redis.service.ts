import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { WebsocketsGateway } from '../games/websockets.gateway';

@Injectable()
export class RedisService {
  private readonly client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(
    private readonly configService: ConfigService,
    @Inject(forwardRef(() => WebsocketsGateway)) // Используем forwardRef
    private readonly websocketsGateway: WebsocketsGateway,
  ) {
    this.client = new Redis({
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
    });
  }

  async setBalance(userId: string, balance: number): Promise<void> {
    await this.client.set(`balance:${userId}`, balance);
    await this.websocketsGateway.updateBalance(userId, balance);
    this.logger.log(`Balance updated for user ${userId}: ${balance}`);
  }

  async getBalance(userId: string): Promise<number> {
    const balance = await this.client.get(`balance:${userId}`);
    return parseFloat(balance || '0');
  }

  async incrementBalance(userId: string, amount: number): Promise<number> {
    const newBalance = await this.client.incrbyfloat(`balance:${userId}`, amount);
    await this.websocketsGateway.updateBalance(userId, parseFloat(newBalance));
    this.logger.log(`Balance incremented for user ${userId}: ${newBalance}`);
    return parseFloat(newBalance);
  }

  async decrementBalance(userId: string, amount: number): Promise<number> {
    const newBalance = await this.client.incrbyfloat(`balance:${userId}`, -amount);
    if (+newBalance < 0) {
      throw new Error('Insufficient balance');
    }
    await this.websocketsGateway.updateBalance(userId, parseFloat(newBalance));
    this.logger.log(`Balance decremented for user ${userId}: ${newBalance}`);
    return parseFloat(newBalance);
  }

  async addTransaction(userId: string, amount: number, type: 'credit' | 'debit'): Promise<void> {
    const transaction = {
      id: Date.now().toString(),
      userId,
      amount,
      type,
      timestamp: new Date().toISOString(),
    };
    await this.client.rpush(`transactions:${userId}`, JSON.stringify(transaction));

    if (type === 'credit') {
      await this.incrementBalance(userId, amount);
    } else {
      await this.decrementBalance(userId, amount);
    }
    this.logger.log(`Transaction added for user ${userId}: ${JSON.stringify(transaction)}`);
  }

  async getTransactions(userId: string): Promise<any[]> {
    const transactions = await this.client.lrange(`transactions:${userId}`, 0, -1);
    return transactions.map((t) => JSON.parse(t));
  }
}
