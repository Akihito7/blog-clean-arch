import { Module } from "@nestjs/common";
import { FollowController } from "./follow.controller";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { Follow } from "../application/use-cases/follow.use-case";
import { FollowRepositoryInteface } from "../domain/repositories/follow.repository.interface";

@Module({
  imports: [RepositoriesInMemoryModule],
  controllers: [FollowController],
  providers: [
    {
      provide: Follow.UseCase,
      useFactory: (followRepository: FollowRepositoryInteface) => {
        return new Follow.UseCase(followRepository)
      },
      inject: ['FollowRepository']
    }
  ]
})
export class FollowModule { }