import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdatePostDTO {

  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsArray()
  @IsOptional()
  tags?: string[];
  
}