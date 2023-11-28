import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @MinLength(8, {
    message: 'Password is too short',
  })
  @MaxLength(50, {
    message: 'Password is too long',
  })
  password: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}
