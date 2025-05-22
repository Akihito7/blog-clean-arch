import { v4 as uuidv4 } from 'uuid';

abstract class BaseEntity<PropsType> {
  _id: string;
  _props: PropsType;

  constructor(props: PropsType, id?: string) {
    this._props = props;
    this._id = id ? id : uuidv4()
  }

  get id() {
    return this.id;
  };

  get props() {
    return this.props;
  }
}