import { IsString, IsNumber, IsObject, IsEnum, Min, Matches, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UrlsDto {
  @ApiProperty({ description: 'URL to redirect user for deposit' })
  @IsString()
  deposit_url: string;

  @ApiProperty({ description: 'URL to redirect user after session ends' })
  @IsString()
  return_url: string;
}

class UserDto {
  @ApiProperty({ description: 'Unique identifier of the player', required: false })
  @IsOptional()
  @IsString()
  user_id?: string;

  @ApiProperty({ description: 'Player’s first name' })
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'Player’s last name' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Player’s nickname displayed in the game' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: 'Player’s city' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Player’s date of birth (YYYY-MM-DD)', example: '1992-08-11' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date_of_birth must be in YYYY-MM-DD format' })
  date_of_birth: string;

  @ApiProperty({ description: 'Player’s registration date (YYYY-MM-DD)', example: '2022-08-11' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'registered_at must be in YYYY-MM-DD format' })
  registered_at: string;

  @ApiProperty({ description: 'Player’s gender (m/f)', enum: ['m', 'f'] })
  @IsEnum(['m', 'f'])
  gender: 'm' | 'f';

  @ApiProperty({ description: 'Player’s country (2-letter ISO 3166-1 code)', example: 'DE' })
  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'country must be a 2-letter ISO 3166-1 code' })
  country: string;
}

export class StartGameDto {
  @ApiProperty({ description: 'Game identifier' })
  @IsString()
  game: string;

  @ApiProperty({ description: 'Currency code (3 or 4 letters, ISO 4217)', example: 'USD' })
  @IsString()
  @Matches(/^[A-Z]{3,4}$/, { message: 'currency must be a 3 or 4 letter ISO 4217 code' })
  currency: string;

  @ApiProperty({ description: 'Language code (2 letters, ISO 639-1)', example: 'en' })
  @IsString()
  @Matches(/^[a-z]{2}$/, { message: 'locale must be a 2-letter ISO 639-1 code' })
  locale: string;

  @ApiProperty({ description: 'Player’s IP address (IPv4)', example: '192.168.1.1' })
  @IsString()
  @Matches(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, { message: 'ip must be a valid IPv4 address' })
  ip: string;

  @ApiProperty({ description: 'Player’s device type', enum: ['mobile', 'desktop'] })
  @IsEnum(['mobile', 'desktop'])
  client_type: 'mobile' | 'desktop';

  @ApiProperty({ description: 'URLs for redirection', type: UrlsDto })
  @IsObject()
  urls: UrlsDto;

  @ApiProperty({ description: 'Player’s attributes', type: UserDto })
  @IsObject()
  user: UserDto;

  @ApiProperty({ description: 'RTP for the game session' })
  @IsNumber()
  @Min(0)
  rtp: number;

  @ApiProperty({ description: 'Bet amount for the game session' })
  @IsNumber()
  @Min(0)
  bet: number;
}
