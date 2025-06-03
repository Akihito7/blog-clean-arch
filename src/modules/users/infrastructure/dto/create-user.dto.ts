import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateUserDTO {

  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minNumbers: 0,
    minSymbols: 0,
    minUppercase: 0
  })
  password: string;
}