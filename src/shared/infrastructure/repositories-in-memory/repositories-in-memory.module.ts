import { Module } from "@nestjs/common";
import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { FollowRepositoryInMemory } from "src/modules/follow/infrastructure/database/in-memory/follow.repository-in-memory";
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
    {
      provide: 'CommentRepository',
      useClass: CommentRepositoryInMemory
    },
    {
      provide: 'FollowRepository',
      useClass: FollowRepositoryInMemory
    },
  ],
  exports: ['PostRepository', 'UserRepository', 'LikeRepository', 'CommentRepository', 'FollowRepository']
})
export class RepositoriesInMemoryModule { }