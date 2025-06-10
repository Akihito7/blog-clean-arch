import { FollowEntity } from "src/modules/follow/domain/entities/follow.entity";
import { FollowRepositoryInteface } from "src/modules/follow/domain/repositories/follow.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";

export class FollowRepositoryInMemory
  extends BaseRepositoryInMemory<FollowEntity>
  implements FollowRepositoryInteface {

  async unFollow(requesterId: string, followedId: string): Promise<void> {
    const followEntityIndex = this.items.findIndex(
      followEntity =>
        followEntity.followerId.toLowerCase() === requesterId.toLowerCase() &&
        followEntity.followingId.toLowerCase() === followedId.toLowerCase()
    );

    if (followEntityIndex !== -1) {
      this.items.splice(followEntityIndex, 1);
    }
  }

  async follow(followEntity: FollowEntity) {
    this.items.push(followEntity);
  }

  async findFollowers(userId: string): Promise<FollowEntity[]> {
    return this.items.filter(
      followEntity => followEntity.followingId.toLowerCase() === userId.toLowerCase()
    );
  }

  async findFollowings(userId: string): Promise<FollowEntity[]> {
    return this.items.filter(
      followEntity => followEntity.followerId.toLowerCase() === userId.toLowerCase()
    );
  }

  async alreadyFollowing(requesteredId: string, followed: string): Promise<boolean> {
    return this.items.some(followEntity =>
      followEntity.followingId.toLowerCase() === requesteredId.toLowerCase()
      && followEntity.followerId.toLowerCase() === followed.toLowerCase())
  }

}