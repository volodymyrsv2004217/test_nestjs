import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { StartGameDto } from './dto/start-game.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get games list' })
  @ApiResponse({ status: 200, description: 'Games retrieved' })
  async getGames() {
    return this.gamesService.getGames();
  }

  @Post()
  @ApiOperation({ summary: 'Start game session' })
  @ApiResponse({ status: 201, description: 'Game session started' })
  async startGame(@Body() startGameDto: StartGameDto) {
    return this.gamesService.startGameSession(startGameDto.userId, startGameDto.gameId, startGameDto.bet);
  }
}
