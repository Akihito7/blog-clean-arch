import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";

export class CommentRepositoryInMemory
  extends BaseRepositoryInMemory<CommentEntity>
  implements CommentRepositoryInterface {

  findByPostId(postId: string): CommentEntity[] {
    return this.items.filter(comment => comment.props.postId.toLowerCase() === postId.toLowerCase());
  }

  findByAuthorInPost(authorId: string, postId: string): CommentEntity[] {
    return this.items.filter(comment =>
      comment.authorId.toLowerCase() === authorId.toLowerCase()
      && comment.postId.toLowerCase() === postId.toLowerCase())
  }

  findByAuthor(authorId: string): CommentEntity[] {
    return this.items.filter(comment => comment.authorId === authorId)
  }

  findByContent(content: string): CommentEntity[] {
    return this.items.filter(comment => comment.content.toLowerCase().includes(content.toLowerCase()))
  }

}