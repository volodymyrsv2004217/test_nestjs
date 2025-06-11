import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
