import { Body, Controller, Get, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { StartGameDto } from './dto/start-game.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GameDto } from './dto/game.dto';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of available games' })
  @ApiResponse({
    status: 200,
    description: 'Games retrieved successfully',
    type: [GameDto],
  })
  @ApiResponse({ status: 500, description: 'Failed to fetch games' })
  async getGames() {
    return this.gamesService.getGames();
  }

  @Post()
  @ApiOperation({ summary: 'Start a game session' })
  @ApiResponse({ status: 201, description: 'Game session started' })
  async startGame(@Body() startGameDto: StartGameDto) {
    return this.gamesService.startGameSession(startGameDto);
  }
}
