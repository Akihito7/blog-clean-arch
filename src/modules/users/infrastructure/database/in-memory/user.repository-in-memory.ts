import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";


export class UserRepositoryInMemory
  extends BaseRepositoryInMemory<UserEntity>
  implements UserRepositoryInterface {

  findByEmail(email: string): UserEntity | null {
    const emailExists = this.emailExists(email);

    if (!emailExists) throw new Error(`User with this email ${email} not found`);

    return this.items.find(item => item.email === email)!
  }

  emailExists(email: string): boolean {
    return this.items.some(item => item.email === email);
  }

}