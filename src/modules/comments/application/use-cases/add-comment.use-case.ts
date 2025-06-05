import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { CommentEntity } from "../../domain/entities/comment.entity";

export namespace AddComment {
  export interface Input {
    postId: string;
    authorId: string;
    content: string;
  }

  export interface Output {
    postId: string;
    authorId: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly commentRepository: CommentRepositoryInterface,
      private readonly postRepository: PostRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { postId, authorId, content } = input;

      const postExists = await this.postRepository.findById(postId);

      if (!postExists) throw new NotFoundError(`Post with id ${postId} not found.`);

      const commentEntity = new CommentEntity({
        authorId,
        content,
        postId
      });

      await this.commentRepository.insert(commentEntity);

      return commentEntity.toJson();
    }
  }
}