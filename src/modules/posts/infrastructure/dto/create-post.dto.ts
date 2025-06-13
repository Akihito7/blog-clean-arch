import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDTO {

  @IsString()
  @MinLength(6)
  title: string;

  @IsString()
  @MinLength(12)
  content: string;
  
  @IsOptional()
  tags?: string[];
}