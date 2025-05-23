//faker
import { faker } from '@faker-js/faker';
import { UserEntityProps } from 'src/modules/users/domain/entities/user.entity';

export class UserPropsFactory {
  static create(props?: UserEntityProps): UserEntityProps {
    return {
      name: props?.name ?? faker.person.fullName(),
      email: props?.email ?? faker.internet.email(),
      password: props?.password ?? faker.internet.password(),
      username: props?.username ?? faker.internet.username(),
    }
  }
}