import { BaseEntity } from "src/shared/domain/entities/base.entity";

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

  private verifyEmail(email: string) {
    if (!email.includes('@')) {
      throw new Error('Email inválido.')
    }
  };

  updatePassword(password: string) {
    this.verifyPassword(password);
    this._password = password;
    this._updatedAt = new Date();
  }

  private verifyPassword(password: string) {
    if (password.length < 8) {
      throw new Error('A senha deve conter no minimo 8 caracteres.')
    }
  }

  upatedUsername(username: string) {
    this.verifyUsername(username);
    this._username = username;
  }

  private verifyUsername(username: string) {
    if (username.length < 6) {
      throw new Error('O username deve conter no minimo 6 caracteres.')
    }
  }

}
