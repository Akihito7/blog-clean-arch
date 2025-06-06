import { IsEmail, IsString } from "class-validator";

export class UpdateUserDTO {
  @IsString()
  name: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;
}