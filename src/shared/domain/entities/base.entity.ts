import { v4 as uuidv4 } from 'uuid';

export abstract class BaseEntity<PropsType> {
  protected _id: string;
  protected _props: PropsType;

  constructor(props: PropsType, id?: string) {
    this._props = props;
    this._id = id ? id : uuidv4()
  }

  get id() {
    return this._id;
  };

  get props() {
    return this._props;
  }

  toJson() {
    return {
      id: this._id,
      ...this._props,
    }
  }
}