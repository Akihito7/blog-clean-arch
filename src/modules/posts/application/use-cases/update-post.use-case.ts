import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";

export namespace UpdatePost {

  export interface Input {
    id: string;
    title: string;
    content: string;
    tags: string[];
    requesterId: string;
  }

  export type Output = void;


  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly postRepository: PostRepositoryInterface) { }

    async execute(input: Input): Promise<void> {

      const { id, requesterId, title, content, tags } = input;

      const post = await this.postRepository.findById(id);

      if (!post) throw new NotFoundError(`Post with this id ${id} not found.`);

      const isOwner = post.authorId === requesterId;

      if (!isOwner) throw new ForbiddenError('You do not have permission to update this post.');

      post.updateTitle(title, requesterId);
      post.updateContent(content, requesterId);
      post.updateTags(tags, requesterId);

      await this.postRepository.update(post);
    }
  }

}