import { IsString } from "class-validator";

export class CheckLikeDTO {
  @IsString()
  authorId: string;
  @IsString()
  postId: string;
}