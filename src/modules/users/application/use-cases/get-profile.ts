import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { PostRepositoryInMemory } from "src/modules/posts/infrastructure/database/in-memory/repositories/post.repository-in-memory";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { PostEntity } from "src/modules/posts/domain/entities/post.entity";

export namespace GetProfile {

  export interface Input {
    username: string
  }

  export interface Output {
    user: {
      name: string;
      username: string;
      email: string;
      password: string;
      createdAt?: Date;
      updatedAt?: Date;
      totalPosts: number;
      totalComments: number
    },
    posts: {
      title: string;
      content: string;
      authorId: string;
      createdAt?: Date;
      updatedAt?: Date;
      tags?: string[];
      totalComments: number;
      totalLikes: number;
    }[],
    comment: {
      postTitle: string;
      postId: string;
      authorId: string;
      content: string;
      createdAt?: Date;
      updatedAt?: Date;
      likes?: number;
    }[]

  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly postRepository: PostRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface,
      private readonly likeRepository: LikeRepositoryInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { username } = input;

      const userEntity = await this.userRepository.findByUsername(username);

      if (!userEntity) throw new NotFoundError("User not found.");

      const postsEntity = await this.postRepository.findByAuthor(userEntity.id);

      const totalPosts = (await this.postRepository.findByAuthor(userEntity.id)).length;

      const totalComments = (await this.commentRepository.findByAuthor(userEntity.id)).length

      const postsToOutput = await Promise.all(this.postToOutput(postsEntity));

      const commentsEntity = await this.commentRepository.findByAuthor(userEntity.id);

      const commentsOutput = await Promise.all(this.commentToOutput(commentsEntity))

      return {
        user: {
          ...userEntity.toJson(),
          totalPosts,
          totalComments
        },
        posts: postsToOutput,
        comment: commentsOutput
      }
    }


    private postToOutput(postsEntity: PostEntity[]) {
      return postsEntity.map(async postEntity => {
        const commentsEntity = await this.commentRepository.findByPostId(postEntity.id);
        const totalComments = commentsEntity.length;
        const totalLikes = await this.likeRepository.countLikeByPost(postEntity.id);
        return {
          ...postEntity.toJson(),
          totalComments,
          totalLikes,
        }
      })
    }

    private commentToOutput(commentsEntity: CommentEntity[]) {
      return commentsEntity.map(async commentEntity => {
        const postEntity = await this.postRepository.findById(commentEntity.postId);
        const postTitle = postEntity ? postEntity.title : 'unknow';

        return {
          ...commentEntity.toJson(),
          postTitle,
        }
      })
    }
  }
}