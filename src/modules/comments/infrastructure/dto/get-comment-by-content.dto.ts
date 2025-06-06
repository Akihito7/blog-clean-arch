import { IsString } from "class-validator";

export class QueryCommentByContentDTO {
  @IsString()
  content: string;
}