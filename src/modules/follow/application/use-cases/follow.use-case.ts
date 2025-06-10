import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { FollowRepositoryInteface } from "../../domain/repositories/follow.repository.interface";
import { ConflictError } from "src/shared/domain/errors/conflict.error";
import { FollowEntity } from "../../domain/entities/follow.entity";

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

    constructor(private readonly followRepository: FollowRepositoryInteface) { }

    async execute(input: Input): Promise<Output> {
      const { followerId, followingId } = input;

      const alreadyFollowing = await this.followRepository.alreadyFollowing(followerId, followingId);

      if (alreadyFollowing) throw new ConflictError("Already following.");

      const followEntity = new FollowEntity({ followerId, followingId });

      await this.followRepository.insert(followEntity);

      return followEntity.toJson()
    }
  }
}