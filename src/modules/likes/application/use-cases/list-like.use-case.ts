import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { LikeEntity } from "../../domain/entities/like.entity";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { UserEntity } from "src/modules/users/domain/entities/user.entity";

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
    authorName: string
    createdAt: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly likeRepository: LikeRepositoryInterface,
      private readonly userRepository: UserRepositoryInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { postId } = input;

      const likesEntity = await this.likeRepository.findManyByPost(postId);

      return { data: await this.toOutput(likesEntity) }
    }

    private async toOutput(likesEntity: LikeEntity[]): Promise<LikeEntityOutput[]> {
      const uniqueAuthorIds = [...new Set(likesEntity.map(like => like.authorId))];

      const users = await Promise.all(
        uniqueAuthorIds.map(id => this.userRepository.findById(id))
      );

      const userMap = new Map<string, UserEntity>();
      users.forEach(user => {
        if (user) userMap.set(user.id, user);
      });

      return likesEntity.map(like => ({
        ...like.toJson(),
        authorName: userMap.get(like.authorId)?.name || 'Unknown',
      }));
    }

  }
}