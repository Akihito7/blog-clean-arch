import { BaseRepository } from "src/shared/domain/repositories/base-repository";
import { UserEntity } from "../entities/user.entity";

export interface UserRepository extends BaseRepository<UserEntity> {
  findByEmail(email: string): UserEntity | null;
  emailExits(email: string): boolean;
}