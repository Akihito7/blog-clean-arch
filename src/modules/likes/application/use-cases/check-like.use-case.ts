import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { LikeEntity } from "../../domain/entities/like.entity";

export namespace CheckLike {
  export interface Input {
    authorId: string;
    postId: string;
  }

  export type Output = {
    likeExists: boolean
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    
    constructor(private readonly likeRepository: LikeRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { authorId, postId } = input;

      const likeEntity = new LikeEntity({ authorId, postId })

      const likeExists = await this.likeRepository.exists(likeEntity);

      return { likeExists }
    }
  }

}