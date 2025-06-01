import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { LikeEntity } from "src/modules/likes/domain/entities/like.entity";
import { CommentEntity } from "../../domain/entities/comment.entity";

export namespace GetCommentAuthorInPost {
  interface Input {
    authorId: string;
    postId: string;
  }

  interface Output {
    data: PostOutput[]
  }

  interface PostOutput {
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: number;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly postRepository: PostRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { authorId, postId } = input;

      const postExists = await this.postRepository.findById(postId);

      if (!postExists) throw new NotFoundError('Post not found.');

      const comments = await this.commentRepository.findByAuthorInPost(authorId, postId);

      return this.commentToOutput(comments);

    }

    private commentToOutput(comments: CommentEntity[]): Output {
      return {
        data: comments.map(comment => comment.toJson())
      }
    }
  }
}