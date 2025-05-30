import { faker } from '@faker-js/faker';
import { UserEntityProps } from 'src/modules/users/domain/entities/user.entity';

interface IUserPropsFactory {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export class UserPropsFactory {
  static create(props?: IUserPropsFactory): UserEntityProps {
    return {
      name: props?.name ?? faker.person.fullName(),
      email: props?.email ?? faker.internet.email(),
      password: props?.password ?? faker.internet.password(),
      username: props?.username ?? faker.internet.username(),
    }
  }
}