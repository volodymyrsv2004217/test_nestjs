import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly redisService: RedisService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get user transactions' })
  @ApiResponse({ status: 200, description: 'Transactions retrieved' })
  async getTransactions(@Param('userId') userId: string) {
    return this.redisService.getTransactions(userId);
  }

  @Post(':userId')
  @ApiOperation({ summary: 'Add a transaction for a user' })
  @ApiResponse({ status: 201, description: 'Transaction added' })
  async addTransaction(@Param('userId') userId: string, @Body() body: { amount: number; type: 'credit' | 'debit' }) {
    await this.redisService.addTransaction(userId, body.amount, body.type);
    return { message: 'Transaction added' };
  }
}
