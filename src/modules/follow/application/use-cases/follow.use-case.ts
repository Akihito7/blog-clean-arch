import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { FollowRepositoryInteface } from "../../domain/repositories/follow.repository.interface";
import { ConflictError } from "src/shared/domain/errors/conflict.error";
import { FollowEntity } from "../../domain/entities/follow.entity";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace Follow {
  export interface Input {
    followerId: string;
    followingId: string
  }

  export interface Output {
    followerId: string;
    followingId: string;
    createdAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly followRepository: FollowRepositoryInteface,
      private readonly userRepository: UserRepositoryInterface
    ) { }

    async execute(input: Input): Promise<Output> {
      const { followerId, followingId } = input;

      const [userFollower, userFollowing] =
        await Promise.all([
          this.userRepository.findById(followerId),
          this.userRepository.findById(followingId),
        ]);

      if (!userFollower) {
        throw new NotFoundError("Follower user not found.");
      }

      if (!userFollowing) {
        throw new NotFoundError("Following user not found.");
      }
      
      const alreadyFollowing = await this.followRepository.alreadyFollowing(followerId, followingId);

      if (alreadyFollowing) throw new ConflictError("Already following.");

      const followEntity = new FollowEntity({ followerId, followingId });

      await this.followRepository.insert(followEntity);

      return followEntity.toJson()
    }
  }
}