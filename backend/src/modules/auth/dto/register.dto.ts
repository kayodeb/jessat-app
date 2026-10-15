import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Kayo Diallo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'kayo@jessat.sn' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'motdepasse123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
