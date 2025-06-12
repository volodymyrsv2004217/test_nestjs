import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsEnum, IsNumber, IsOptional, IsObject, Matches } from 'class-validator';

export class GameDto {
  @ApiProperty({ description: 'Идентификатор игры', example: '1085' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'Название игры', example: 'Casino Malta Roulette' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Производитель игры', example: 'evolution' })
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiProperty({
    description: 'Категория игры',
    enum: ['slots', 'scratch', 'roulette', 'card', 'casual', 'lottery', 'poker', 'craps', 'crash', 'fishing', 'mines', 'video_poker', 'virtual_sports'],
    example: 'roulette',
  })
  @IsEnum(['slots', 'scratch', 'roulette', 'card', 'casual', 'lottery', 'poker', 'craps', 'crash', 'fishing', 'mines', 'video_poker', 'virtual_sports'])
  category: string;

  @ApiPropertyOptional({
    description: 'Тема игры',
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

  @ApiProperty({ description: 'Группа функций игры', example: 'lightning' })
  @IsString()
  feature_group: string;

  @ApiProperty({ description: 'Является ли игра кастомизированной', example: false })
  @IsBoolean()
  customised: boolean;

  @ApiProperty({ description: 'Устройства, поддерживающие игру', example: ['desktop', 'mobile'], type: [String] })
  @IsArray()
  @IsEnum(['mobile', 'desktop'], { each: true })
  devices: string[];

  @ApiProperty({ description: 'Лицензии, связанные с игрой', example: ['BG', 'CW', 'EE', 'MT'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  licenses: string[];

  @ApiProperty({
    description: 'Тип джекпота',
    enum: ['Network', 'Local', 'In game', 'Not Available'],
    example: 'Not Available',
  })
  @IsEnum(['Network', 'Local', 'In game', 'Not Available'])
  jackpot_type: string;

  @ApiProperty({ description: 'Запрещено ли использование бонусных средств', example: false })
  @IsBoolean()
  forbid_bonus_play: boolean;

  @ApiPropertyOptional({ description: 'Поддерживает ли игра бесплатные спины', example: false })
  @IsOptional()
  @IsBoolean()
  has_freespins?: boolean;

  @ApiPropertyOptional({ description: 'RTP игры', example: 98 })
  @IsOptional()
  @IsNumber()
  payout?: number;

  @ApiPropertyOptional({ description: 'Частота выигрышей на 100 ставок', example: 7.9 })
  @IsOptional()
  @IsNumber()
  hit_rate?: number;

  @ApiPropertyOptional({
    description: 'Уровень волатильности игры',
    enum: ['low', 'medium-low', 'medium', 'medium-high', 'high', 'very-high', 'low-medium', 'None'],
    example: 'None',
  })
  @IsOptional()
  @IsEnum(['low', 'medium-low', 'medium', 'medium-high', 'high', 'very-high', 'low-medium', 'None'])
  volatility_rating?: string;

  @ApiPropertyOptional({ description: 'Поддерживает ли игра джекпот', example: false })
  @IsOptional()
  @IsBoolean()
  has_jackpot?: boolean;

  @ApiPropertyOptional({ description: 'Количество линий выплат', example: 25 })
  @IsOptional()
  @IsNumber()
  lines?: number;

  @ApiPropertyOptional({ description: 'Количество способов выигрыша', example: 243 })
  @IsOptional()
  @IsNumber()
  ways?: number;

  @ApiPropertyOptional({ description: 'Описание игры', example: 'An exciting roulette game' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Является ли игра живой', example: true })
  @IsOptional()
  @IsBoolean()
  has_live?: boolean;

  @ApiPropertyOptional({ description: 'Поддерживает ли игра HD-разрешение', example: true })
  @IsOptional()
  @IsBoolean()
  hd?: boolean;

  @ApiProperty({ description: 'Имеет ли игра накопительные бонусы', example: true })
  @IsBoolean()
  accumulating: boolean;

  @ApiPropertyOptional({ description: 'Максимальный множитель ставки', example: 2000.0 })
  @IsOptional()
  @IsNumber()
  multiplier?: number;

  @ApiPropertyOptional({ description: 'Дата выпуска игры (YYYY-MM-DD)', example: '2018-06-05' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'released_at должен быть в формате YYYY-MM-DD' })
  released_at?: string;

  @ApiPropertyOptional({ description: 'Дата отзыва игры (YYYY-MM-DD)', example: '2019-02-13' })
  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'recalled_at должен быть в формате YYYY-MM-DD' })
  recalled_at?: string;

  @ApiProperty({ description: 'Поддерживает ли игра покупку бонусов', example: true })
  @IsBoolean()
  bonus_buy: boolean;

  @ApiPropertyOptional({ description: 'Ограничения по территориям', example: {} })
  @IsOptional()
  @IsObject()
  restrictions?: Record<string, any>;
}
