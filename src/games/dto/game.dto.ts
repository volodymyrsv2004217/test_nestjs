import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsEnum, IsNumber, IsOptional, IsObject, Matches } from 'class-validator';

export class GameDto {
  @ApiProperty({ description: 'Game identifier', example: '1085' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Game title', example: 'Casino Malta Roulette' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Game producer', example: 'evolution' })
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiProperty({
    description: 'Game category',
    enum: ['slots', 'scratch', 'roulette', 'card', 'casual', 'lottery', 'poker', 'craps', 'crash', 'fishing', 'mines', 'video_poker', 'virtual_sports'],
    example: 'roulette',
  })
  @IsEnum(['slots', 'scratch', 'roulette', 'card', 'casual', 'lottery', 'poker', 'craps', 'crash', 'fishing', 'mines', 'video_poker', 'virtual_sports'])
  category: string;

  @ApiPropertyOptional({
    description: 'Game theme',
    enum: [
      'africa',
      'ancient_civilizations',
      'asia',
      'book_off',
      'branded',
      'easter',
      'egypt',
      'fantasy',
      'food',
      'fruits',
      'girls',
      'halloween',
      'horrors',
      'joker',
      'luxury_life',
      'military',
      'other',
      'party',
      'pirates',
      'retro',
      'space',
      'sport',
      'st_patrick_day',
      'st_valentines_day',
      'sweets',
      'underwater_world',
      'western',
      'x_mas_and_new_year',
    ],
    example: 'other',
  })
  @IsOptional()
  @IsEnum([
    'africa',
    'ancient_civilizations',
    'asia',
    'book_off',
    'branded',
    'easter',
    'egypt',
    'fantasy',
    'food',
    'fruits',
    'girls',
    'halloween',
    'horrors',
    'joker',
    'luxury_life',
    'military',
    'other',
    'party',
    'pirates',
    'retro',
    'space',
    'sport',
    'st_patrick_day',
    'st_valentines_day',
    'sweets',
    'underwater_world',
    'western',
    'x_mas_and_new_year',
  ])
  theme?: string;

  @ApiProperty({ description: 'Game feature group', example: 'lightning' })
  @IsString()
  feature_group: string;

  @ApiProperty({ description: 'Is the game customized', example: false })
  @IsBoolean()
  customised: boolean;

  @ApiProperty({ description: 'Supported devices', example: ['desktop', 'mobile'], type: [String] })
  @IsArray()
  @IsEnum(['mobile', 'desktop'], { each: true })
  devices: string[];

  @ApiProperty({ description: 'Associated licenses', example: ['BG', 'CW', 'EE', 'MT'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  licenses: string[];

  @ApiProperty({
    description: 'Jackpot type',
    enum: ['Network', 'Local', 'In game', 'Not Available'],
    example: 'Not Available',
  })
  @IsEnum(['Network', 'Local', 'In game', 'Not Available'])
  jackpot_type: string;

  @ApiProperty({ description: 'Is bonus play forbidden', example: false })
  @IsBoolean()
  forbid_bonus_play: boolean;

  @ApiPropertyOptional({ description: 'Does the game support freespins', example: false })
  @IsOptional()
  @IsBoolean()
  has_freespins?: boolean;

  @ApiPropertyOptional({ description: 'Return to Player (RTP)', example: 98 })
  @IsOptional()
  @IsNumber()
  payout?: number;

  @ApiPropertyOptional({ description: 'Hit rate per 100 spins', example: 7.9 })
  @IsOptional()
  @IsNumber()
  hit_rate?: number;

  @ApiPropertyOptional({
    description: 'Game volatility rating',
    enum: ['low', 'medium-low', 'medium', 'medium-high', 'high', 'very-high', 'low-medium', 'None'],
    example: 'None',
  })
  @IsOptional()
  @IsEnum(['low', 'medium-low', 'medium', 'medium-high', 'high', 'very-high', 'low-medium', 'None'])
  volatility_rating?: string;

  @ApiPropertyOptional({ description: 'Does the game have a jackpot', example: false })
  @IsOptional()
  @IsBoolean()
  has_jackpot?: boolean;

  @ApiPropertyOptional({ description: 'Number of paylines', example: 25 })
  @IsOptional()
  @IsNumber()
  lines?: number;

  @ApiPropertyOptional({ description: 'Number of winning ways', example: 243 })
  @IsOptional()
  @IsNumber()
  ways?: number;

  @ApiPropertyOptional({ description: 'Game description', example: 'An exciting roulette game' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Is the game live', example: true })
  @IsOptional()
  @IsBoolean()
  has_live?: boolean;

  @ApiPropertyOptional({ description: 'Supports HD resolution', example: true })
  @IsOptional()
  @IsBoolean()
  hd?: boolean;

  @ApiProperty({ description: 'Has accumulating bonus', example: true })
  @IsBoolean()
  accumulating: boolean;

  @ApiPropertyOptional({ description: 'Maximum bet multiplier', example: 2000.0 })
  @IsOptional()
  @IsNumber()
  multiplier?: number;

  @ApiPropertyOptional({ description: 'Release date (YYYY-MM-DD)', example: '2018-06-05' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'released_at must be in format YYYY-MM-DD' })
  released_at?: string;

  @ApiPropertyOptional({ description: 'Recall date (YYYY-MM-DD)', example: '2019-02-13' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'recalled_at must be in format YYYY-MM-DD' })
  recalled_at?: string;

  @ApiProperty({ description: 'Supports bonus buy feature', example: true })
  @IsBoolean()
  bonus_buy: boolean;

  @ApiPropertyOptional({ description: 'Territorial restrictions', example: {} })
  @IsOptional()
  @IsObject()
  restrictions?: Record<string, any>;
}
