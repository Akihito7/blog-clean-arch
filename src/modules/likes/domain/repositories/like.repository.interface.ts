import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { LikeEntity } from "../entities/like.entity";

export interface LikeRepositoryInterface extends BaseRepository<LikeEntity> {
  exists(entity: LikeEntity): Promise<boolean>
  findManyByPost(postId: string): Promise<LikeEntity[]>
}