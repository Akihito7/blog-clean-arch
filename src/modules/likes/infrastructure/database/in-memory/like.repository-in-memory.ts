import { LikeEntity } from "src/modules/likes/domain/entities/like.entity";
import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";

export class LikeRepositoryInMemory extends BaseRepositoryInMemory<LikeEntity> implements LikeRepositoryInterface {

  async exists(entity: LikeEntity): Promise<boolean> {
    return this.items.some(likeEntity =>
      likeEntity.authorId.toLowerCase() === entity.authorId.toLowerCase()
      && likeEntity.postId?.toLowerCase() === entity.postId?.toLowerCase())
  }

  async likeCommentExists(entity: LikeEntity): Promise<boolean> {
    return this.items.some(likeEntity =>
      likeEntity.authorId.toLowerCase() === entity.authorId.toLowerCase()
      && likeEntity.commentId?.toLowerCase() === entity.commentId?.toLowerCase())
  }

  async findManyByPost(postId: string): Promise<LikeEntity[]> {
    return this.items.filter(likeEntity => likeEntity.postId?.toLowerCase() === postId.toLowerCase())
  }

  async countLikeByPost(postId: string): Promise<number> {
    return this.items.filter(like => like.postId?.toLowerCase() === postId.toLowerCase()).length;
  }
  async countLikeByCommment(commentId: string): Promise<number> {
    return this.items.filter(like => like.commentId?.toLowerCase() === commentId.toLowerCase()).length;
  }


  async getLikeByPostAndAuthor(postId: string, authorId: string): Promise<LikeEntity | undefined> {
    const like = this.items.find(like =>
      like.authorId.toLowerCase() === authorId.toLowerCase()
      && like.postId?.toLowerCase() === postId.toLowerCase())
    return like
  }

  async getLikeByCommentAndAuthor(commentId: string, authorId: string): Promise<LikeEntity | undefined> {
    const like = this.items.find(like =>
      like.authorId.toLowerCase() === authorId.toLowerCase()
      && like.commentId?.toLowerCase() === commentId.toLowerCase())
    return like
  }
} 