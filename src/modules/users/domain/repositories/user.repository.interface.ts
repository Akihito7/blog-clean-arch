import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { UserEntity } from "../entities/user.entity";

export interface UserRepositoryInterface extends BaseRepository<UserEntity> {
  findByEmail(email: string): Promise<UserEntity | null>;
  emailExists(email: string): Promise<boolean>;
  findByUsername(username: string): Promise<UserEntity>
}