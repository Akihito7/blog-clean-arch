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

  protected _name: string;
  protected _username: string;
  protected _email: string;
  protected _password: string;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  constructor(props: UserEntityProps, id?: string) {
    super(props, id);
    this._name = props.name;
    this._email = props.email;
    this._username = props.username;
    this._password = props.password;
    this._createdAt = props.createdAt ?? new Date();
    this._updatedAt = props.updatedAt ?? null as any;
    this._props.createdAt = props.createdAt ?? new Date();
    this._props.updatedAt = props.updatedAt ?? null as any;
  }

  get name() {
    return this._name;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  get username() {
    return this._username;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  updateEmail(email: string) {
    this.verifyEmail(email);
    this._email = email;
    this._updatedAt = new Date();
  }

  update({ name, username }: { name: string, username: string }) {
    this._name = name;
    this._username = username;
    this._updatedAt = new Date();
  }

  private verifyEmail(email: string) {
    if (!email.includes('@')) {
      throw new InvalidContentError('Invalid email address.');
    }
  };

  updatePassword(password: string) {
    this.verifyPassword(password);
    this._password = password;
    this._updatedAt = new Date();
  }

  private verifyPassword(password: string) {
    if (password.length < 8) {
      throw new InvalidContentError('Password must be at least 8 characters long.')
    }
  }

  upatedUsername(username: string) {
    this.verifyUsername(username);
    this._username = username;
  }

  private verifyUsername(username: string) {
    if (username.length < 6) {
      throw new InvalidContentError('Username must be at least 6 characters long.');
    }
  }

}
