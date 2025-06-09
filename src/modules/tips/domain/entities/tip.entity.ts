import { BaseEntity } from "src/shared/domain/entities/base.entity";
interface TipEntityInterface {
  title: string;
  content: string;
  link?: string;
  current: boolean;
  used?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TipEntity extends BaseEntity {
  constructor(protected _props: TipEntityInterface, id?: string) {
    super(_props, id);
    this._props.used = _props.used ?? false;
    this._props.createdAt = _props.createdAt ?? new Date();
    this._props.updatedAt = _props.updatedAt ?? new Date();
  }

  get title() {
    return this._props.title;
  }

  get content() {
    return this._props.content;
  }

  get link() {
    return this._props.link;
  }

  get used() {
    return this._props.used;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.updatedAt;
  }

  get current() {
    return this._props.current;
  }

  markAsUsed() {
    this._props.used = true;
    this._props.updatedAt = new Date();
  }

  markAsCurrent() {
    this._props.current = true;
    this._props.updatedAt = new Date();
  }

  markAsNotCurrent() {
    this._props.current = false;
    this._props.updatedAt = new Date();
  }
}
