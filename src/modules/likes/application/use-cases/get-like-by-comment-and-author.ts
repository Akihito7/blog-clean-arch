import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace GetLikeByCommentAndAuthor {

  export interface Input {
    authorId: string;
    commentId: string;
  }

  export type Output = {
    postId: string;
    authorId: string;
    createdAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly likeRepository: LikeRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { authorId, commentId } = input;

      const likeEntity = await this.likeRepository.getLikeByCommentAndAuthor(commentId, authorId);

      if (!likeEntity) throw new NotFoundError("Like not found");

      return likeEntity.toJson()
    }
  }

}