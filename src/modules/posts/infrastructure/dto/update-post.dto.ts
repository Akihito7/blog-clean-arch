import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
  
}