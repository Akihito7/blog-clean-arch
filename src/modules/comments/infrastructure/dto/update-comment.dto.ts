import { MaxLength, MinLength } from "class-validator";

export class UpdateCommentDTO {
  @MinLength(4)
  @MaxLength(512)
  content: string;
}