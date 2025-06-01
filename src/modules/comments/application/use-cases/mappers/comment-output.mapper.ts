import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";

export namespace CommentOutputMapper {
  export interface Output {
    data: Comment[]
  }

  export interface Comment {
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
  }

  export function toOutput(comments: CommentEntity[]): Output {
    return {
      data: comments.map(comment => comment.toJson())
    }
  }

}