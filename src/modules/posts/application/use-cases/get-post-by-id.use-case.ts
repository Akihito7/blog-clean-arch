import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";

export namespace GetPost {

  export interface Input {
    id: string;
  }

  export interface Output {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt?: Date;
    updatedAt?: Date;
    tags?: string[];
    likes?: number;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly postRepository: PostRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { id } = input;

      const post = await this.postRepository.findById(id);

      if (!post) throw new NotFoundError(`Post with this id ${id} not found.`);

      return post.toJson();
    }
  }

}