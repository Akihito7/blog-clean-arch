import { Module } from "@nestjs/common";
import { FollowController } from "./follow.controller";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { Follow } from "../application/use-cases/follow.use-case";
import { FollowRepositoryInteface } from "../domain/repositories/follow.repository.interface";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";

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
    }
  ]
})
export class FollowModule { }