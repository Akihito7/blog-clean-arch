import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";

export namespace GetPost {

  export interface Output {
    data: {
      id: string;
      title: string;
      content: string;
      authorId: string;
      createdAt?: Date;
      updatedAt?: Date;
      tags?: string[];
      likes?: number;
    }[]
  }

  export class UseCase implements BaseUseCaseInterface<any, Output> {

    constructor(private readonly postRepository: PostRepositoryInterface) { }

    async execute(): Promise<Output> {
      const posts = await this.postRepository.findMany();

      return {
        data: posts.map(post => post.toJson())
      }
    }
  }
}