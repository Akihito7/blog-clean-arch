import { Module } from "@nestjs/common";
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
  ],
  exports : ['PostRepository', 'UserRepository']
})
export class RepositoriesInMemoryModule { }