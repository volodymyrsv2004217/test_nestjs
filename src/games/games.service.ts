import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { Game } from './interfaces/game.interface';

@Injectable()
export class GamesService {
  private readonly logger = new Logger(GamesService.name);
  private readonly apiUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.apiUrl = this.configService.get<string>('ALL_IN_GAME_API_URL') || '';
  }

  async getGames(): Promise<Game[]> {
    const cacheKey = 'games_list';
    const cachedGames = await this.cacheManager.get<Game[]>(cacheKey);

    if (cachedGames) {
      this.logger.log('Returning cached games list');
      return cachedGames;
    }

    try {
      const response: any = await firstValueFrom(
        this.httpService.get(`${this.apiUrl}/games`, {
          headers: {
            Authorization: `Bearer ${this.configService.get<string>('ALL_IN_GAME_API_TOKEN')}`,
          },
        }),
      );
      const games = response.data;
      await this.cacheManager.set(cacheKey, games, 3600);
      this.logger.log('Games list fetched and cached');
      return games;
    } catch (error) {
      this.logger.error(`Failed to fetch games: ${error.message}`);
      throw new Error('Unable to fetch games');
    }
  }

  async startGameSession(userId: string, gameId: string, bet: number) {
    try {
      const response: any = await firstValueFrom(
        this.httpService.post(
          `${this.apiUrl}/sessions`,
          { userId, gameId, bet },
          {
            headers: {
              Authorization: `Bearer ${this.configService.get<string>('ALL_IN_GAME_API_TOKEN')}`,
            },
          },
        ),
      );
      this.logger.log(`Game session started for user ${userId}`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to start game session: ${error.message}`);
      throw new Error('Unable to start game session');
    }
  }
}
