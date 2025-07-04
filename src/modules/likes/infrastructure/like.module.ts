import { Module } from "@nestjs/common";
import { LikeController } from "./like.controller";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { AddLike } from "../application/use-cases/add-like.use-case";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { LikeRepositoryInterface } from "../domain/repositories/like.repository.interface";
import { CheckLike } from "../application/use-cases/check-like.use-case";
import { ListLike } from "../application/use-cases/list-like.use-case";
import { RemoveLike } from "../application/use-cases/remove-like.use-case";
import { GetLikeByPostAndAuthor } from "../application/use-cases/get-like-by-post-and-author";
import { AddLikeToCommentUseCase } from "../application/use-cases/add-like-to-comment.use-case";
import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { GetLikeByCommentAndAuthor } from "../application/use-cases/get-like-by-comment-and-author";
import { CheckCommentLike } from "../application/use-cases/check-like-comment";

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
    },
    {
      provide: CheckLike.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface) => {
        return new CheckLike.UseCase(likeRepository)
      },
      inject: ['LikeRepository', 'PostRepository']
    },
    {
      provide: ListLike.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface, userRepository: UserRepositoryInterface) => {
        return new ListLike.UseCase(likeRepository, userRepository)
      },
      inject: ['LikeRepository', 'UserRepository']
    },
    {
      provide: RemoveLike.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface, userRepository: UserRepositoryInterface) => {
        return new RemoveLike.UseCase(likeRepository)
      },
      inject: ['LikeRepository']
    },
    {
      provide: GetLikeByPostAndAuthor.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface) => {
        return new GetLikeByPostAndAuthor.UseCase(likeRepository)
      },
      inject: ['LikeRepository']
    },
    {
      provide: AddLikeToCommentUseCase.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface, commentRepository: CommentRepositoryInMemory) => {
        return new AddLikeToCommentUseCase.UseCase(likeRepository, commentRepository)
      },
      inject: ['LikeRepository', 'CommentRepository']
    },

    {
      provide: GetLikeByCommentAndAuthor.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface) => {
        return new GetLikeByCommentAndAuthor.UseCase(likeRepository)
      },
      inject: ['LikeRepository']
    },

    {
      provide: CheckCommentLike.UseCase,
      useFactory: (likeRepository: LikeRepositoryInterface) => {
        return new CheckCommentLike.UseCase(likeRepository)
      },
      inject: ['LikeRepository']
    },

  ]

})
export class LikeModule { }