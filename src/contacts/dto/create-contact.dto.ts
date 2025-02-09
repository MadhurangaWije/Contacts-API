import { IsString, IsEmail, IsOptional, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @IsOptional()
  @Matches(/^(?:\+[1-9]\d{1,14}|0\d{9,})$/, {
    message: 'Mobile number is in incorrect format',
  })
  mobileNumber?: string;

  @IsOptional()
  @Matches(/^(?:\+[1-9]\d{1,14}|0\d{9,})$/, {
    message: 'Home number is in incorrect format',
  })
  homeNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;
}