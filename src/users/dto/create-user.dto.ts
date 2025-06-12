import { IsString, IsEmail, IsEnum, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Уникальное имя пользователя', example: 'testuser' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Электронная почта пользователя', example: 'test@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Имя пользователя', example: 'John' })
  @IsString()
  firstname: string;

  @ApiProperty({ description: 'Фамилия пользователя', example: 'Doe' })
  @IsString()
  lastname: string;

  @ApiProperty({ description: 'Никнейм пользователя, отображаемый в игре', example: 'Johnny' })
  @IsString()
  nickname: string;

  @ApiProperty({ description: 'Город пользователя', example: 'Frankfurt' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Дата рождения (YYYY-MM-DD)', example: '1992-08-11' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date_of_birth должен быть в формате YYYY-MM-DD' })
  date_of_birth: string;

  @ApiProperty({ description: 'Дата регистрации (YYYY-MM-DD)', example: '2022-08-11' })
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'registered_at должен быть в формате YYYY-MM-DD' })
  registered_at: string;

  @ApiProperty({ description: 'Пол пользователя (m/f)', enum: ['m', 'f'], example: 'm' })
  @IsEnum(['m', 'f'])
  gender: 'm' | 'f';

  @ApiProperty({ description: 'Страна пользователя (2-буквенный код ISO 3166-1)', example: 'DE' })
  @IsString()
  @Matches(/^[A-Z]{2}$/, { message: 'country должен быть 2-буквенным кодом ISO 3166-1' })
  country: string;
}
