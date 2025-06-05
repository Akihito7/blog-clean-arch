import { Delete, Get, Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostRepositoryInMemory } from "./database/in-memory/repositories/post.repository-in-memory";
import { UserRepositoryInMemory } from "src/modules/users/infrastructure/database/in-memory/user.repository-in-memory";
import { CreatePost } from "../application/use-cases/create-post.use-case";
import { PostRepositoryInterface } from "../domain/repositories/post.repository.interface";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { DeletePost } from "../application/use-cases/delete-post.use-case";
import { GetManyPost } from "../application/use-cases/get-many-post.use-case";
import { GetManyPostByAuthorId } from "../application/use-cases/get-many-post-by-author-id.use-case";
import { GetPost } from "../application/use-cases/get-post-by-id.use-case";
import { GetPostByTags } from "../application/use-cases/get-post-by-tags.use-case";
import { UpdatePost } from "../application/use-cases/update-post.use-case";

@Module({
  controllers: [PostController],
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
      provide: CreatePost.UseCase,
      useFactory: (postRepository: PostRepositoryInterface, userRepository: UserRepositoryInterface) => {
        return new CreatePost.UseCase(userRepository, postRepository)
      },
      inject: ['PostRepository', 'UserRepository']
    },
    {
      provide: DeletePost.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new DeletePost.UseCase(postRepository)
      },
      inject: ['PostRepository']
    },
    {
      provide: GetManyPost.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new GetManyPost.UseCase(postRepository)
      },
      inject: ['PostRepository']
    },
    {
      provide: GetManyPostByAuthorId.UseCase,
      useFactory: (postRepository: PostRepositoryInterface, userRepository: UserRepositoryInterface) => {
        return new GetManyPostByAuthorId.UseCase(userRepository, postRepository)
      },
      inject: ['PostRepository', 'UserRepository']
    },
    {
      provide: GetPost.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new GetPost.UseCase(postRepository)
      },
      inject: ['PostRepository']
    },
    {
      provide: GetPostByTags.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new GetPost.UseCase(postRepository)
      },
      inject: ['PostRepository']
    },
    {
      provide: UpdatePost.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new GetPost.UseCase(postRepository)
      },
      inject: ['PostRepository']
    }
  ]
})
export class PostModule { }