import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { LikeEntity } from "../../domain/entities/like.entity";

export namespace CheckCommentLike {
  export interface Input {
    authorId: string;
    commentId: string;
  }

  export type Output = {
    likeExists: boolean
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly likeRepository: LikeRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { authorId, commentId } = input;

      const likeEntity = new LikeEntity({ authorId, commentId })

      const likeExists = await this.likeRepository.likeCommentExists(likeEntity);

      return { likeExists }
    }
  }

}