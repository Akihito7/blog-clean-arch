import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { UnauthorizedError } from "src/shared/domain/errors/unauthorized.error";

export namespace DeleteComment {

  export interface Input {
    requesteredId: string;
    commentId: string;
  }

  export type Output = void;

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(
      private readonly commentRepository: CommentRepositoryInterface,
    ) { }
    async execute(input: Input): Promise<Output> {
      const { requesteredId, commentId } = input;

      const commentEntity = await this.commentRepository.findById(commentId);

      if (!commentEntity) throw new NotFoundError('Comment not found.');

      if (requesteredId.toLowerCase() !== commentEntity.authorId.toLowerCase())
        throw new UnauthorizedError("User dont have permission.")

      await this.commentRepository.delete(commentEntity.id);
    }
  }
}