import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { FollowRepositoryInteface } from "../../domain/repositories/follow.repository.interface";

export namespace Unfollow {
  export interface Input {
    requesteredId: string;
    followedId: string
  }

  export type Output = Promise<void>

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly followRepository: FollowRepositoryInteface) { }

    async execute(input: Input): Promise<Output> {

      const { requesteredId, followedId } = input;

      await this.followRepository.unFollow(requesteredId, followedId);
    }
  }
}