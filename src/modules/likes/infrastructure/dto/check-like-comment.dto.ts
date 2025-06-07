import { IsString } from "class-validator";

export class CheckLikeCommentDTO {
  @IsString()
  authorId: string;
  @IsString()
  commentId: string;
}