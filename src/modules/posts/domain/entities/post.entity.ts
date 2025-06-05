import { BaseEntity } from "src/shared/domain/entities/base.entity";
import { InvalidContentError } from "src/shared/domain/errors/invalid-content.error";
import { NotAllowedError } from "src/shared/domain/errors/not-allowed.error";

export interface PostEntityProps {
  title: string;
  content: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
};

export class PostEntity extends BaseEntity<PostEntityProps> {
  constructor(protected _props: PostEntityProps, id?: string) {
    super(_props, id);
    this.verifyTitle(_props.title);
    this.verifyContent(_props.content);
    this._props.createdAt = _props.createdAt ?? new Date();
    this._props.updatedAt = _props.updatedAt ?? null as any;
  };

  get id(): string {
    return this._id
  }

  get title(): string {
    return this._props.title;
  }

  get content(): string {
    return this._props.content;
  }

  get authorId(): string {
    return this._props.authorId;
  }

  get createdAt(): Date | undefined {
    return this._props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._props.updatedAt;
  }

  get tags(): string[] | undefined {
    return this._props.tags;
  }
  
  updateTitle(title: string, authorId: string) {
    this.verifyTitle(title, authorId);
    this._props.title = title;
    this._props.updatedAt = new Date();
  }

  verifyTitle(title: string, authorId?: string) {

    if (authorId && this.authorId != authorId) {
      throw new NotAllowedError('You do not have permission to change the title.');
    }

    if (!title || title.length < 6) {
      throw new InvalidContentError('Title must be longer than 5 characters.');
    }
  }

  updateContent(content: string, authorId: string) {
    this.verifyContent(content, authorId);
    this._props.content = content;
    this._props.updatedAt = new Date();
  }

  verifyContent(content: string, authorId?: string) {

    if (authorId && this.authorId != authorId) {
      throw new NotAllowedError('You do not have permission to change the content.');
    }
    if (!content || content.length < 64) {
      throw new InvalidContentError('Content must be longer than 63 characters.');
    }
  }

  updateTags(tags: string[], authorId: string) {
    this._props.tags = tags;
    this._props.updatedAt = new Date();
  }

}