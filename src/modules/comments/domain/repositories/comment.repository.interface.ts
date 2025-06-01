import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { CommentEntity } from "../entities/comment.entity";

export interface CommentRepositoryInterface extends BaseRepository<CommentEntity> {
  findByAuthor(authorId: string): Promise<CommentEntity[]>
  findByContent(content: string): Promise<CommentEntity[]>
  findByPostId(postId: string): Promise<CommentEntity[]>
  findByAuthorInPost(authorId: string, postId: string): Promise<CommentEntity[]>
}