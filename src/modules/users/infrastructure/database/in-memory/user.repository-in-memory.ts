import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";


export class UserRepositoryInMemory
  extends BaseRepositoryInMemory<UserEntity>
  implements UserRepositoryInterface {

  async findByEmail(email: string): Promise<UserEntity | null> {
    const emailExists = await this.emailExists(email);

    if (!emailExists) throw new Error(`User with this email ${email} not found`);

    return this.items.find(item => item.email === email)!
  }

  async emailExists(email: string): Promise<boolean> {
    return this.items.some(item => item.email === email);
  }

  async findByUsername(username: string): Promise<UserEntity> {
    const user = this.items.find(item => item.username.toLowerCase() === username.toLowerCase())
    if (!user) throw new NotFoundError(`User with this username ${username} not found`);
    return user
  }

}