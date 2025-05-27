import { BaseEntity } from "src/shared/domain/entities/base.entity";


interface LikeEntityProps {
  postId: string;
  authorId: string;
  createdAt?: Date;
}

export class LikeEntity extends BaseEntity {
  constructor(protected _props: LikeEntityProps, id?: string) {
    super(_props, id)
    this._props.createdAt = _props.createdAt ?? new Date();
  }

  get postId(): string {
    return this._props.postId
  }

  get authorId(): string {
    return this._props.authorId;
  }


  get createdAt(): Date {
    return this._props.createdAt!;
  }
a
}