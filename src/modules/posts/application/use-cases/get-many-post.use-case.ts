import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { PostRepositoryInterface } from "../../domain/repositories/post.repository.interface";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";

export namespace GetManyPost {

  export type Output = Post[]

  type Post = {
    id: string;
    title: string;
    content: string;
    authorId: string;
    authorName?: string
    createdAt?: Date;
    updatedAt?: Date;
    tags?: string[];
    likes?: number;
    comments: {
      postId: string;
      authorId: string;
      content: string;
      createdAt?: Date;
      updatedAt?: Date;
      likes?: number;
    }[];

  }

  export class UseCase implements BaseUseCaseInterface<any, Output> {

    constructor(
      private readonly postRepository: PostRepositoryInterface,
      private readonly userRepository: UserRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface,
      private readonly likeRepository: LikeRepositoryInterface
    ) { }

    async execute(): Promise<Output> {
      const posts = await this.postRepository.findMany();

      const postsOutput = await Promise.all(posts.map(async post => {
        const author = await this.userRepository.findById(post.authorId);
        const comments = await this.commentRepository.findByPostId(post.id);
        const likes = await this.likeRepository.countLikeByPost(post.id)
        return {
          ...post.toJson(),
          authorName: author?.username,
          comments: comments.map(comment => comment.toJson()),
          likes,
        }
      }))

      return postsOutput;

    }
  }
}