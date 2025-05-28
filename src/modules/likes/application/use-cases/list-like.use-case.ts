import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { LikeEntity } from "../../domain/entities/like.entity";

export namespace ListLike {
  export interface Input {
    postId: string;
  }

  export interface Output {
    data: LikeEntityOutput[]
  }

  type LikeEntityOutput = {
    id: string;
    postId: string;
    authorId: string;
    createdAt: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(private readonly likeRepository: LikeRepositoryInterface) { }
    async execute(input: Input): Promise<Output> {

      const { postId } = input;

      const likesEntity = await this.likeRepository.findManyByPost(postId);

      return { data: this.toOutput(likesEntity) }
    }

    private toOutput(likesEntity: LikeEntity[]): LikeEntityOutput[] {
      return likesEntity.map(likeEntity => likeEntity.toJson())
    }
  }
}