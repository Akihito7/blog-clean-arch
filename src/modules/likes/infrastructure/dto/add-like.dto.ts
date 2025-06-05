import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class AddLikeDTO {
  @IsString()
  @IsNotEmpty()
  postId: string;
}