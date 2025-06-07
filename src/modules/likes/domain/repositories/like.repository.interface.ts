import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { LikeEntity } from "../entities/like.entity";

export interface LikeRepositoryInterface extends BaseRepository<LikeEntity> {
  exists(entity: LikeEntity): Promise<boolean>
  likeCommentExists(entity: LikeEntity): Promise<boolean>
  findManyByPost(postId: string): Promise<LikeEntity[]>
  countLikeByPost(postId: string): Promise<number>
  countLikeByCommment(commentId: string): Promise<number>
  getLikeByPostAndAuthor(postId: string, authorId: string): Promise<LikeEntity | undefined>
  getLikeByCommentAndAuthor(commentId: string, authorId: string): Promise<LikeEntity | undefined>
}