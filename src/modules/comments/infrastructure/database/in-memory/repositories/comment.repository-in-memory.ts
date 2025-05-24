import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";

export class CommentRepositoryInMemory
  extends BaseRepositoryInMemory<CommentEntity>
  implements CommentRepositoryInterface {

  findByAuthor(authorId: string): CommentEntity[] {
    return this.items.filter(comment => comment.authorId === authorId)
  }

  findByContent(content: string): CommentEntity[] {
    return this.items.filter(comment => comment.content.toLowerCase().includes(content.toLowerCase()))
  }

}