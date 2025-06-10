import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { FollowEntity } from "../entities/follow.entity";

export interface FollowRepositoryInteface extends BaseRepository<FollowEntity> {
  follow(followEntity: FollowEntity): Promise<void>
  unFollow(requesteredId: string, followed: string): Promise<void>
  findFollowers(userId: string): Promise<FollowEntity[] | undefined>
  findFollowings(userId: string): Promise<FollowEntity[] | undefined>
  alreadyFollowing(requesteredId: string, followed: string): Promise<boolean>
}