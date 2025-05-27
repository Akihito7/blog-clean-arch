import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { PostEntity } from "../../domain/entities/post.entity";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";

export namespace CreatePost {

  export interface Input {
    title: string;
    content: string;
    authorId: string;
    createdAt?: Date;
    updatedAt?: Date;
    tags?: string[];
    likes?: number;
  }

  export interface Output  {
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
    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly postRepository: PostRepositoryInterface,
    ) { }

    async execute(input: Input): Promise<Output> {

      const { authorId } = input;

      const userExists = await this.userRepository.findById(authorId);

      if (!userExists) throw new NotFoundError(`User with ID ${authorId} not found.`);


      const postEntity = new PostEntity(input);

      await this.postRepository.insert(postEntity);

      return postEntity.toJson()
    }
  }

}