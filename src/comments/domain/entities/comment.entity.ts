import { BaseEntity } from "src/shared/domain/entities/base.entity";

interface CommentEntityProps {
  authorId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likes?: number;
};

export class CommentEntity extends BaseEntity<CommentEntityProps> {
  constructor(props: CommentEntityProps, id?: string) {
    super(props, id);
    this.verifyContent(props.content);
    this._props.createdAt = props.createdAt ?? new Date();
    this._props.likes = props.likes ?? 0;
  }

  get authorId(): string {
    return this._props.authorId;
  }

  get content(): string {
    return this._props.content;
  }

  get createdAt(): Date {
    return this._props.createdAt;
  }

  get updatedAt(): Date {
    return this._props.updatedAt;
  }

  get likes(): number | undefined {
    return this._props.likes;
  }

  updateContent(content: string) {
    this.verifyContent(content);
    this._props.content = content;
    this._props.updatedAt = new Date();
  }

  private verifyContent(content: string) {
    if (!content?.trim()) {
      throw new Error('O comentário precisa ter um conteúdo.');
    }

    const length = content.length;

    if (length < 4) {
      throw new Error('O comentário não pode ter menos de 4 caracteres.');
    }

    if (length > 512) {
      throw new Error('O comentário não pode ter mais de 512 caracteres.');
    }
  }


}