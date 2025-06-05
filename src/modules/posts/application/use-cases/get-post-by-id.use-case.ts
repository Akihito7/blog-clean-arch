import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";
import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";

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
    likes: number;
    comments: {
      postId: string;
      authorId: string;
      content: string;
      createdAt?: Date;
      updatedAt?: Date;
      likes?: number;
    }[];
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly postRepository: PostRepositoryInterface,
      private readonly likeRepository: LikeRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { id } = input;

      const post = await this.postRepository.findById(id);

      if (!post) throw new NotFoundError(`Post with this id ${id} not found.`);

      const likes = await this.likeRepository.countLikeByPost(post.id)

      const comments = await this.commentRepository.findByPostId(post.id)

      return {
        ...post.toJson(),
        likes: likes,
        comments: comments.map(comment => comment.toJson())
      }
    }
  }

}