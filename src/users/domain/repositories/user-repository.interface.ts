import { BaseRepository } from "src/shared/domain/repositories/repository-base";
import { UserEntity } from "../entities/user-entity";

export interface UserRepository extends BaseRepository<UserEntity> {
  findByEmail(email: string): UserEntity | null;
  emailExits(email: string): boolean;
}