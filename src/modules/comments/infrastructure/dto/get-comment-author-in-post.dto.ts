import { IsString } from "class-validator";

export class ParamsGetCommentAuthorInPostDTO {
  @IsString()
  postId: string;
  @IsString()
  authorId: string;
}