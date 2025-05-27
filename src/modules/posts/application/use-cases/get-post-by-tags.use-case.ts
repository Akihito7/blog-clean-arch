import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";

export namespace GetPostByTags {

  export type Output = Post[]

  interface Input {
    tags: string[]
  };

  type Post = {
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

      const { tags } = input;

      const posts = await this.postRepository.findByTags(tags);

      return posts.map(post => post.toJson());

    }
  }
}