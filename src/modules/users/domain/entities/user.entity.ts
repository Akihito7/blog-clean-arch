import { BaseEntity } from "src/shared/domain/entities/base.entity";
import { InvalidContentError } from "src/shared/domain/errors/invalid-content.error";

export interface UserEntityProps {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class UserEntity extends BaseEntity<UserEntityProps> {

  constructor(protected _props: UserEntityProps, id?: string) {
    super(_props, id);
    this.props.createdAt = _props.createdAt ?? new Date();
    this.props.updatedAt = _props.updatedAt ?? null as any;
  }

  get name() {
    return this._props.name;
  }

  get email() {
    return this._props.email;
  }

  get password() {
    return this._props.password;
  }

  get username() {
    return this._props.username;
  }

  get createdAt() {
    return this._props.createdAt;
  }

  get updatedAt() {
    return this._props.createdAt;
  }

  updateEmail(email: string) {
    this.verifyEmail(email);
    this._props.email = email;
    this._props.updatedAt = new Date();
  }

  update({ name, username }: { name: string, username: string }) {
    this._props.name = name;
    this._props.username = username;
    this._props.updatedAt = new Date();
  }

  private verifyEmail(email: string) {
    if (!email.includes('@')) {
      throw new InvalidContentError('Invalid email address.');
    }
  };

  updatePassword(password: string) {
    this.verifyPassword(password);
    this._props.password = password;
    this._props.updatedAt = new Date();
  }

  private verifyPassword(password: string) {
    if (password.length < 8) {
      throw new InvalidContentError('Password must be at least 8 characters long.')
    }
  }

  upatedUsername(username: string) {
    this.verifyUsername(username);
    this._props.username = username;
    this._props.updatedAt = new Date();
  }

  private verifyUsername(username: string) {
    if (username.length < 6) {
      throw new InvalidContentError('Username must be at least 6 characters long.');
    }
  }

}
