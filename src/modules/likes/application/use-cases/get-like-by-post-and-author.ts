import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace GetLikeByPostAndAuthor {

  export interface Input {
    authorId: string;
    postId: string;
  }

  export type Output = {
    postId: string;
    authorId: string;
    createdAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly likeRepository: LikeRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { authorId, postId } = input;

      const likeEntity = await this.likeRepository.getLikeByPostAndAuthor(postId, authorId);

      if (!likeEntity) throw new NotFoundError("Like not found");

      return likeEntity.toJson()
    }
  }

}