import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { FollowRepositoryInteface } from "../../domain/repositories/follow.repository.interface";

export namespace FindFollowers {
  export interface Input {
    userId: string
  }

  export interface Output {
    followers: FollowOutput[]
  }

  interface FollowOutput {
    followerId: string;
    followingId: string;
    createdAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly followRepository: FollowRepositoryInteface) { }

    async execute(input: Input): Promise<Output> {

      const { userId } = input;

      const followers = await this.followRepository.findFollowers(userId) ?? []

      return {
        followers: followers.map(followEntity => followEntity.toJson())
      }
    }
  }
}