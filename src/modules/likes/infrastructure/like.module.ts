import { Module } from "@nestjs/common";
import { LikeController } from "./like.controller";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { AddLike } from "../application/use-cases/add-like.use-case";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { LikeRepositoryInterface } from "../domain/repositories/like.repository.interface";

@Module({
  imports: [RepositoriesInMemoryModule],
  controllers: [LikeController],
  providers: [
    {
      provide: AddLike.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface, postRepository: PostRepositoryInterface) => {
        return new AddLike.UseCase(likeRepository, postRepository)
      },
      inject: ['LikeRepository', 'PostRepository']
    }
  ]

})
export class LikeModule { }