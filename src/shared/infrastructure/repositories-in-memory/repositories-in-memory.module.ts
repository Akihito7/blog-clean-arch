import { Module } from "@nestjs/common";
import { LikeRepositoryInMemory } from "src/modules/likes/infrastructure/database/in-memory/like.repository-in-memory";
import { PostRepositoryInMemory } from "src/modules/posts/infrastructure/database/in-memory/repositories/post.repository-in-memory";
import { UserRepositoryInMemory } from "src/modules/users/infrastructure/database/in-memory/user.repository-in-memory";

@Module({
  providers: [
    {
      provide: 'PostRepository',
      useClass: PostRepositoryInMemory
    },
    {
      provide: 'UserRepository',
      useClass: UserRepositoryInMemory
    },
    {
      provide: 'LikeRepository',
      useClass: LikeRepositoryInMemory
    },
  ],
  exports: ['PostRepository', 'UserRepository', 'LikeRepository']
})
export class RepositoriesInMemoryModule { }