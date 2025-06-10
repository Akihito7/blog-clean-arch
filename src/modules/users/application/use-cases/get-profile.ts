import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { PostEntity } from "src/modules/posts/domain/entities/post.entity";
import { FollowRepositoryInteface } from "src/modules/follow/domain/repositories/follow.repository.interface";
import { FollowEntity } from "src/modules/follow/domain/entities/follow.entity";

export namespace GetProfile {
  export interface Input {
    username: string;
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
      totalComments: number;
      followersOfUser: FollowerOutput[],
      usersIamFollowing: FollowingOutput[],
    };
    posts: {
      title: string;
      content: string;
      authorId: string;
      createdAt?: Date;
      updatedAt?: Date;
      tags?: string[];
      totalComments: number;
      totalLikes: number;
    }[];
    comment: {
      postTitle: string;
      postId: string;
      authorId: string;
      content: string;
      createdAt?: Date;
      updatedAt?: Date;
      likes?: number;
    }[];
  }

  type FollowerOutput = {
    followId: string;
    followerId: string
    followerName: string;
    followedAt: Date | undefined
  }

  type FollowingOutput = {
    followId: string
    followingId: string;
    followingName: string;
    followedAt: Date | undefined
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly postRepository: PostRepositoryInterface,
      private readonly commentRepository: CommentRepositoryInterface,
      private readonly likeRepository: LikeRepositoryInterface,
      private readonly followRepository: FollowRepositoryInteface
    ) { }

    async execute(input: Input): Promise<Output> {
      const { username } = input;

      const userEntity = await this.userRepository.findByUsername(username);
      if (!userEntity) throw new NotFoundError("User not found.");

      const followings = await this.followRepository.findFollowings(userEntity.id) ?? [];
      const followers = await this.followRepository.findFollowers(userEntity.id) ?? [];

      const formattedFollowers = await Promise.all(
        this.formatFollowersToOutput(followers)
      );

      const formatedFollowing = await Promise.all(
        this.formatFollowingToOuput(followings)
      )

      const postsEntity = await this.postRepository.findByAuthor(userEntity.id);
      const totalPosts = postsEntity.length;

      const commentsEntity = await this.commentRepository.findByAuthor(userEntity.id);
      const totalComments = commentsEntity.length;

      const formattedPosts = await Promise.all(
        this.formatPostsToOutput(postsEntity)
      );

      const formattedComments = await Promise.all(
        this.formatCommentsToOutput(commentsEntity)
      );

      return {
        user: {
          ...userEntity.toJson(),
          totalPosts,
          totalComments,
          followersOfUser: formattedFollowers,
          usersIamFollowing: formatedFollowing,
        },
        posts: formattedPosts,
        comment: formattedComments,
      };
    }

    private formatPostsToOutput(postsEntity: PostEntity[]) {
      return postsEntity.map(async postEntity => {
        const comments = await this.commentRepository.findByPostId(postEntity.id);
        const totalComments = comments.length;
        const totalLikes = await this.likeRepository.countLikeByPost(postEntity.id);

        return {
          ...postEntity.toJson(),
          totalComments,
          totalLikes,
        };
      });
    }

    private formatCommentsToOutput(commentsEntity: CommentEntity[]) {
      return commentsEntity.map(async commentEntity => {
        const post = await this.postRepository.findById(commentEntity.postId);
        return {
          ...commentEntity.toJson(),
          postTitle: post?.title ?? 'unknown',
        };
      });
    }

    private formatFollowersToOutput(followers: FollowEntity[]) {
      return followers.map(async follow => {
        const followerEntity = await this.userRepository.findById(follow.followerId);
        return {
          followId: follow.id,
          followerId: followerEntity!.id,
          followerName: followerEntity!.username ?? 'unknonw',
          followedAt: followerEntity?.createdAt,
        };
      });
    }

    private formatFollowingToOuput(followings: FollowEntity[]) {
      return followings.map(async follow => {
        const followingEntity = await this.userRepository.findById(follow.followingId);
        return {
         followId: follow.id,
          followingId: followingEntity!.id,
          followingName: followingEntity?.name ?? 'uknown',
          followedAt: followingEntity!.createdAt,
        }
      })
    }
  }
}
