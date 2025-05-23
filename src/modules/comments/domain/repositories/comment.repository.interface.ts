import { BaseRepository } from "src/shared/domain/repositories/base-repository";
import { CommentEntity } from "../entities/comment.entity";

export interface CommentRepositoryInterface extends BaseRepository {
  findByAuthor(authorId: string): CommentEntity[]
  findByContent(content: string): CommentEntity[]
}