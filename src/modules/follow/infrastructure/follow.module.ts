import { Module } from "@nestjs/common";
import { FollowController } from "./follow.controller";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { Follow } from "../application/use-cases/follow.use-case";
import { FollowRepositoryInteface } from "../domain/repositories/follow.repository.interface";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { Unfollow } from "../application/use-cases/unfollow.use-case";
import { FindFollowers } from "../application/use-cases/find-followers.use-case";
import { FindFollowing } from "../application/use-cases/find-followings.use-case";

@Module({
  imports: [RepositoriesInMemoryModule],
  controllers: [FollowController],
  providers: [
    {
      provide: Follow.UseCase,
      useFactory: (followRepository: FollowRepositoryInteface, userRepository: UserRepositoryInterface) => {
        return new Follow.UseCase(followRepository, userRepository)
      },
      inject: ['FollowRepository', 'UserRepository']
    },
    {
      provide: Unfollow.UseCase,
      useFactory: (followRepository: FollowRepositoryInteface) => {
        return new Unfollow.UseCase(followRepository)
      },
      inject: ['FollowRepository']
    },
    {
      provide: FindFollowers.UseCase,
      useFactory: (followRepository: FollowRepositoryInteface) => {
        return new FindFollowers.UseCase(followRepository)
      },
      inject: ['FollowRepository']
    },
    {
      provide: FindFollowing.UseCase,
      useFactory: (followRepository: FollowRepositoryInteface) => {
        return new FindFollowing.UseCase(followRepository)
      },
      inject: ['FollowRepository']
    }
  ]
})
export class FollowModule { }