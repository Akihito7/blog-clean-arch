import { BaseEntity } from "src/shared/domain/entities/base.entity";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";

interface LikeEntityProps {
  postId: string;
  authorId: string;
  createdAt?: Date;
}

export class LikeEntity extends BaseEntity {
  constructor(protected _props: LikeEntityProps, id?: string) {
    LikeEntity.verifyIfHasAuthor(_props.authorId);
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

  static verifyIfHasAuthor(authorId: string) {
    if (!authorId) {
      throw new ForbiddenError('Does not can give like without an account.')
    }
  }

}