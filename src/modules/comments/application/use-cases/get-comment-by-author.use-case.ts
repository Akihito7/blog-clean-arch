import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { CommentOutputMapper } from "./mappers/comment-output.mapper";

export namespace GetCommentByAuthor {

  interface Input {
    authorId: string;
  }

  export class UseCase implements BaseUseCaseInterface<Input, CommentOutputMapper.Output> {

    constructor(private readonly commentRepository: CommentRepositoryInterface) { }

    async execute(input: Input): Promise<CommentOutputMapper.Output> {

      const { authorId } = input;

      const comments = await this.commentRepository.findByAuthor(authorId);

      return CommentOutputMapper.toOutput(comments)
    }

  }
}