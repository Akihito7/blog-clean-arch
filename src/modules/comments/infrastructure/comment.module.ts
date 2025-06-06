import { Module } from "@nestjs/common";
import { CommentController } from "./comment.controller";
import { AddComment } from "../application/use-cases/add-comment.use-case";
import { CommentRepositoryInterface } from "../domain/repositories/comment.repository.interface";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { RepositoriesInMemoryModule } from "src/shared/infrastructure/repositories-in-memory/repositories-in-memory.module";
import { GetCommentByPost } from "../application/use-cases/get-comment-by-post.use-case";
import { GetCommentAuthorInPost } from "../application/use-cases/get-comment-author-in-post.use-case";
import { GetCommentByAuthor } from "../application/use-cases/get-comment-by-author.use-case";
import { GetCommentByContent } from "../application/use-cases/get-comment-by-content.use-case";

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
      provide: GetCommentAuthorInPost.UseCase,
      useFactory: (commentRepository: CommentRepositoryInterface, postRepository: PostRepositoryInterface) => {
        return new GetCommentAuthorInPost.UseCase(postRepository, commentRepository)
      },
      inject: ['CommentRepository', 'PostRepository']
    },
    {
      provide: GetCommentByAuthor.UseCase,
      useFactory: (commentRepository: CommentRepositoryInterface) => {
        return new GetCommentByAuthor.UseCase(commentRepository)
      },
      inject: ['CommentRepository']
    },
    {
      provide: GetCommentByContent.UseCase,
      useFactory: (commentRepository: CommentRepositoryInterface) => {
        return new GetCommentByContent.UseCase(commentRepository)
      },
      inject: ['CommentRepository']
    },
    {
      provide: GetCommentByPost.UseCase,
      useFactory: (commentRepository: CommentRepositoryInterface) => {
        return new GetCommentByPost.UseCase(commentRepository)
      },
      inject: ['CommentRepository',]
    },
  ]
})
export class CommentModule { }