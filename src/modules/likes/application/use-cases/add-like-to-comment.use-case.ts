import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { LikeEntity } from "../../domain/entities/like.entity";

export namespace AddLikeToCommentUseCase {
  export interface Input {
    authorId: string;
    commentId: string;
  }

  export interface Output {
    id: string;
    postId: string;
    commentId: string
    authorId: string;
    createdAt: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly likeRepository: LikeRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { commentId, authorId } = input;

      const comment = await this.commentRepository.findById(commentId);

      if (!comment) throw new NotFoundError(`Comment with this id ${commentId} not found.`);

      const likeEntity = new LikeEntity({ authorId, commentId });

      await this.likeRepository.insert(likeEntity);

      return likeEntity.toJson()
    }
  }
}