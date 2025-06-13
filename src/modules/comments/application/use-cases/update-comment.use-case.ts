import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace UpdateComment {

  export interface Input {
    requesteredId: string;
    commentId: string;
    content: string;
  }

  export interface Output {
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(private readonly commentRepository: CommentRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {
      const { commentId, requesteredId, content } = input;

      const commentEntity = await this.commentRepository.findById(commentId);

      if (!commentEntity) throw new NotFoundError("Comment not found.");

      commentEntity.updateContent(content, requesteredId);

      await this.commentRepository.update(commentEntity);

      return commentEntity.toJson()
    }
  }
}