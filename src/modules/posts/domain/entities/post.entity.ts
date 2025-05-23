import { BaseEntity } from "src/shared/domain/entities/base.entity";

export interface PostEntityProps {
  title: string;
  content: string;
  authorId: string;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: string[];
  likes?: number;
};

export class PostEntity extends BaseEntity<PostEntityProps> {
  constructor(protected _props: PostEntityProps, id?: string) {
    super(_props, id);
    this.verifyTitle(_props.title);
    this.verifyContent(_props.content);
    this._props.createdAt = _props.createdAt ?? new Date();
    this._props.updatedAt = _props.updatedAt ?? null as any;
    this._props.likes = _props.likes ?? 0;
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

  get likes(): number | undefined {
    return this._props.likes;
  }

  updateTitle(title: string, authorId: string) {
    this.verifyTitle(title, authorId);
    this._props.title = title;
    this._props.updatedAt = new Date();
  }

  verifyTitle(title: string, authorId?: string) {

    if (authorId && this.authorId != authorId) {
      throw new Error('Voce nao tem permissao para mudar o titulo.')
    }

    if (!title || title.length < 6) {
      throw new Error('Título precisa ser maior que 6 caracteres.')
    }
  }

  updateContent(content: string, authorId: string) {
    this.verifyContent(content, authorId);
    this._props.content = content;
    this._props.updatedAt = new Date();
  }

  verifyContent(content: string, authorId?: string) {

    if (authorId && this.authorId != authorId) {
      throw new Error('Voce nao tem permissao para mudar o titulo.')
    }
    if (!content || content.length < 64) {
      throw new Error('O conteúdo precisa ser maior que 64 caracteres.')
    }
  }

  updateTags(tags: string[]) {
    this._props.tags = tags;
    this._props.updatedAt = new Date();
  }

}