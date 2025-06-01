import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { CommentOutputMapper } from "./mappers/comment-output.mapper";

export namespace GetCommentAuthorInPost {

  interface Input {
    authorId: string;
    postId: string;
  }

  export class UseCase implements BaseUseCaseInterface<Input, CommentOutputMapper.Output> {

    constructor(
      private readonly postRepository: PostRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface
    ) { }

    async execute(input: Input): Promise<CommentOutputMapper.Output> {

      const { authorId, postId } = input;

      const postExists = await this.postRepository.findById(postId);

      if (!postExists) throw new NotFoundError('Post not found.');

      const comments = await this.commentRepository.findByAuthorInPost(authorId, postId);

      return CommentOutputMapper.toOutput(comments);

    }
  }
}