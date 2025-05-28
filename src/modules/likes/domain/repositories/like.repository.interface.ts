import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { LikeEntity } from "../entities/like.entity";

export interface LikeRepositoryInterface extends BaseRepository<LikeEntity> {
  exists(postId: string, authorId: string): Promise<boolean>
  addLike(postId: string, authorId: string): Promise<LikeEntity>
  deleteLike(postId: string, authorId: string): Promise<void>
}