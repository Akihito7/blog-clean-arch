import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { CommentOutputMapper } from "./mappers/comment-output.mapper";

export namespace GetCommentByPost {
  export interface Input {
    postId: string;
  }

  export class UseCase implements BaseUseCaseInterface<Input, CommentOutputMapper.Output> {

    constructor(private readonly commentRepository: CommentRepositoryInterface) { }

    async execute(input: Input): Promise<CommentOutputMapper.Output> {

      const { postId } = input;

      const comments = await this.commentRepository.findByPostId(postId);

      return CommentOutputMapper.toOutput(comments);
    }
  }
}