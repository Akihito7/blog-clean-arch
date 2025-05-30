import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { LikeEntity } from "../../domain/entities/like.entity";
import { ConflictError } from "src/shared/domain/errors/conflict.error";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace AddLike {

  export interface Input {
    authorId: string;
    postId: string;
  }

  export interface Output {
    id: string;
    postId: string;
    authorId: string;
    createdAt: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly likeRepository: LikeRepositoryInterface,
      private readonly postRepository: PostRepositoryInterface,
    ) { }

    async execute(input: Input): Promise<Output> {

      const { authorId, postId } = input;

      const postExists = await this.postRepository.findById(postId);

      if (!postExists) throw new NotFoundError('Post not found.')

      const likeEntity = new LikeEntity({ authorId, postId });

      const likeExists = await this.likeRepository.exists(likeEntity);

      if (likeExists) throw new ConflictError('User already liked this post.');

      await this.likeRepository.insert(likeEntity);

      return likeEntity.toJson();
    }
  }

}