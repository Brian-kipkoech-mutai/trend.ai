import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
