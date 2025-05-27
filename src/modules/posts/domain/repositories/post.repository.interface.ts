import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { PostEntity } from "../entities/post.entity";

export interface PostRepositoryInterface extends BaseRepository<PostEntity> {
  findByTags(tags: string[]): PostEntity[]
  findByAuthor(authorId: string): PostEntity[]
  findByTitle(title: string): PostEntity[]
}