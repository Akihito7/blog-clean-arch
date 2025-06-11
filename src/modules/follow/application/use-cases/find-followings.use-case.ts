import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { FollowRepositoryInteface } from "../../domain/repositories/follow.repository.interface";

export namespace FindFollowing {
  export interface Input {
    userId: string
  }

  export interface Output {
    followings: FollowOutput[]
  }

  interface FollowOutput {
    followerId: string;
    followingId: string;
    createaAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly followRepository: FollowRepositoryInteface) { }

    async execute(input: Input): Promise<Output> {
      const { userId } = input;

      const followings = await this.followRepository.findFollowings(userId) ?? []

      return {
        followings: followings.map(followEntity => followEntity.toJson())
      }
    }
  }
}