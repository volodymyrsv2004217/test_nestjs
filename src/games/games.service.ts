import { HttpService } from '@nestjs/axios';
import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { StartGameDto } from './dto/start-game.dto';
import { RedisService } from '../redis/redis.service';
import { GameDto } from './dto/game.dto';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(forwardRef(() => RedisService))
    private readonly redisService: RedisService,
  ) {
    this.apiUrl = this.configService.get<string>('ALL_IN_GAME_API_URL') || '';
  }

  async getGames(): Promise<GameDto[]> {
    const cacheKey = 'games_list';
    const cachedGames = await this.cacheManager.get<GameDto[]>(cacheKey);

    if (cachedGames) {
      this.logger.log('Returning cached games list');
      return cachedGames;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/games`, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('ALL_IN_GAME_API_TOKEN')}`,
          },
        }),
      );
      const games: GameDto[] = response.data;
      await this.cacheManager.set(cacheKey, games, 3600);
      this.logger.log('Games list fetched and cached');
      return games;
    } catch (error) {
      this.logger.error(`Failed to fetch games: ${error.message}`);
      throw new Error('Unable to fetch games');
    }
  }

  async startGameSession(data: StartGameDto): Promise<{ sessionUrl: string }> {
    const balance = await this.redisService.getBalance(data.user.user_id || data.user.nickname);
    if (balance < data.bet) {
      this.logger.error(`Insufficient balance for user ${data.user.user_id || data.user.nickname}`);
      throw new Error('Insufficient balance');
    }

    try {
      // const payload = {
      //   game: dto.game,
      //   currency: dto.currency,
      //   locale: dto.locale,
      //   ip: dto.ip,
      //   client_type: dto.client_type,
      //   urls: {
      //     deposit_url: dto.urls.deposit_url,
      //     return_url: dto.urls.return_url,
      //   },
      //   user: {
      //     user_id: dto.user.user_id,
      //     firstname: dto.user.firstname,
      //     lastname: dto.user.lastname,
      //     nickname: dto.user.nickname,
      //     city: dto.user.city,
      //     date_of_birth: dto.user.date_of_birth,
      //     registered_at: dto.user.registered_at,
      //     gender: dto.user.gender,
      //     country: dto.user.country,
      //   },
      //   rtp: dto.rtp,
      // };

      const response = await firstValueFrom(
        this.httpService.post(`${this.apiUrl}/session`, data, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('ALL_IN_GAME_API_TOKEN')}`,
          },
        }),
      );

      // Deduct bet and log transaction
      await this.redisService.decrementBalance(data.user.user_id || data.user.nickname, data.bet);
      await this.redisService.addTransaction(data.user.user_id || data.user.nickname, data.bet, 'debit');
      this.logger.log(`Game session started for user ${data.user.user_id || data.user.nickname}`);

      return { sessionUrl: response.data.url };
    } catch (error) {
      this.logger.error(`Failed to start game session: ${error.message}`);
      throw new Error('Unable to start game session');
    }
  }
}
