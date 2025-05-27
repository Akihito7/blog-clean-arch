import { BaseEntity } from "src/shared/domain/entities/base.entity";
import { InvalidContentError } from "src/shared/domain/errors/invalid-content.error";
import { NotAllowedError } from "src/shared/domain/errors/not-allowed.error";

export interface CommentEntityProps {
  postId: string;
  authorId: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
};

export class CommentEntity extends BaseEntity<CommentEntityProps> {
  constructor(props: CommentEntityProps, id?: string) {
    super(props, id);
    this.verifyContent(props.content);
    this._props.createdAt = props.createdAt ?? new Date();
    this._props.updatedAt = props.updatedAt ?? null as any
    this._props.likes = props.likes ?? 0;
  }

  get postId(): string {
    return this._props.postId
  }

  get authorId(): string {
    return this._props.authorId;
  }

  get content(): string {
    return this._props.content;
  }

  get createdAt(): Date {
    return this._props.createdAt!;
  }

  get updatedAt(): Date {
    return this._props.updatedAt as Date
  }

  get likes(): number | undefined {
    return this._props.likes;
  }

  updateContent(content: string, authorId: string) {
    this.verifyContent(content, authorId);
    this._props.content = content;
    this._props.updatedAt = new Date();
  }

  private verifyContent(content: string, authorId?: string) {

    if (authorId && this.authorId !== authorId) {
      throw new NotAllowedError("You are not allowed to update this comment.");
    }

    if (!content?.trim()) {
      throw new InvalidContentError("Comment must have content.");
    }

    if (content.length < 4) {
      throw new InvalidContentError("Comment must be at least 4 characters long.");
    }

    if (content.length > 512) {
      throw new InvalidContentError("Comment must be at most 512 characters long.");
    }
  }

}