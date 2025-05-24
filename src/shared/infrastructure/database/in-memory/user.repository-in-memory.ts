import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";
import { UserEntity } from "../../../../modules/users/domain/entities/user.entity";
import { UserRepository } from "src/modules/users/domain/repositories/user.repository.interface";

export class UserRepositoryInMemory
  extends BaseRepositoryInMemory<UserEntity>
  implements UserRepository {

  findByEmail(email: string): UserEntity | null {
    const emailExists = this.emailExists(email);

    if (!emailExists) throw new Error(`User with this email ${email} not found`);

    return this.items.find(item => item.email === email)!
  }

  emailExists(email: string): boolean {
    return this.items.some(item => item.email === email);
  }
  
}