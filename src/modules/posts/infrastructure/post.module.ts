import { Module } from "@nestjs/common";
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
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";

@Module({
  imports: [RepositoriesInMemoryModule],
  controllers: [PostController],
  providers: [
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
      useFactory: (
        postRepository: PostRepositoryInterface,
        userRepository: UserRepositoryInMemory,
        commentRepository: CommentRepositoryInMemory,
        likeRepository: LikeRepositoryInterface
      ) => {
        return new GetManyPost.UseCase(postRepository, userRepository, commentRepository, likeRepository)
      },
      inject: ['PostRepository', 'UserRepository', 'CommentRepository', 'LikeRepository']
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
      useFactory: (postRepository: PostRepositoryInterface,
        likeRepository: LikeRepositoryInterface,
        commentRepository: CommentRepositoryInMemory,
        userRepository: UserRepositoryInMemory
      ) => {
        return new GetPost.UseCase(postRepository, likeRepository, commentRepository, userRepository)
      },
      inject: ['PostRepository', 'LikeRepository', 'CommentRepository', 'UserRepository']
    },
    {
      provide: GetPostByTags.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new GetPostByTags.UseCase(postRepository)
      },
      inject: ['PostRepository']
    },
    {
      provide: UpdatePost.UseCase,
      useFactory: (postRepository: PostRepositoryInterface) => {
        return new UpdatePost.UseCase(postRepository)
      },
      inject: ['PostRepository']
    }
  ]
})
export class PostModule { }