import { BaseRepository } from "src/shared/domain/repositories/base-repository";
import { PostEntity } from "../post.entity";

export interface PostRepositoryInterface extends BaseRepository {
  findByTags(tags: string[]): PostEntity[]
  findByAuthor(authorId: string): PostEntity[]
  findByTitle(title: string): PostEntity[]
}