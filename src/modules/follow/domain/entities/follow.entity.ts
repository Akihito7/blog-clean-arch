import { BaseEntity } from "src/shared/domain/entities/base.entity";

interface FollowEntityProps {
  followerId: string;
  followingId: string;
  createdAt?: Date;
}

export class FollowEntity extends BaseEntity<FollowEntityProps> {
  constructor(protected _props: FollowEntityProps, id?: string) {
    super(_props, id);
    this._props.createdAt = _props.createdAt ?? new Date()
  }

  get followerId() {
    return this._props.followerId;
  }

  get followingId() {
    return this._props.followingId;
  }

  get createdAt() {
    return this.createdAt;
  }

}