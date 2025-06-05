import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { AddComment } from "../application/use-cases/add-comment.use-case";
import { CommentRepositoryInterface } from "../domain/repositories/comment.repository.interface";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { GetCommentByPost } from "../application/use-cases/get-comment-by-post.use-case";

@Module({
  imports: [RepositoriesInMemoryModule],
  controllers: [CommentController],
  providers: [
    {
      provide: AddComment.UseCase,
      useFactory: (commentRepository: CommentRepositoryInterface, postRepository: PostRepositoryInterface) => {
        return new AddComment.UseCase(commentRepository, postRepository)
      },
      inject: ['CommentRepository', 'PostRepository']
    },
    {
      provide: GetCommentByPost.UseCase,
      useFactory: (commentRepository: CommentRepositoryInterface) => {
        return new GetCommentByPost.UseCase(commentRepository)
      },
      inject: ['CommentRepository',]
    }
  ]
})
export class CommentModule { }