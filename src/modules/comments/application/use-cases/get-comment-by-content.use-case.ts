import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInMemory } from "../../infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { BadRequestError } from "src/shared/domain/errors/bad-request.error";
import { CommentOutputMapper } from "./mappers/comment-output.mapper";

export namespace GetCommentByContent {
  export interface Input {
    content: string;
  }

  export class UseCase implements BaseUseCaseInterface<Input, CommentOutputMapper.Output> {

    constructor(private readonly commentRepository: CommentRepositoryInMemory) { }

    async execute(input: Input): Promise<CommentOutputMapper.Output> {

      const { content } = input;

      if (!content) throw new BadRequestError('Content not provided.');

      const comments = await this.commentRepository.findByContent(content);

      return CommentOutputMapper.toOutput(comments);

    }
  }

}