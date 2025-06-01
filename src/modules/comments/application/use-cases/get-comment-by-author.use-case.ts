import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { CommentRepositoryInterface } from "../../domain/repositories/comment.repository.interface";
import { CommentEntity } from "../../domain/entities/comment.entity";

export namespace GetCommentByAuthor {
  interface Input {
    authorId: string;
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

    constructor(private readonly commentRepository: CommentRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { authorId } = input;

      const comments = await this.commentRepository.findByAuthor(authorId);

      return this.commentToOutput(comments)
    }

    private commentToOutput(comments: CommentEntity[]): Output {
      return {
        data: comments.map(comment => comment.toJson())
      }
    }

  }
}