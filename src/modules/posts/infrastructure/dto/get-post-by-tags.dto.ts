import { IsNotEmpty, IsString } from "class-validator";

export class QueryGetPostByTags {
  @IsNotEmpty()
  @IsString()
  tags: string
}