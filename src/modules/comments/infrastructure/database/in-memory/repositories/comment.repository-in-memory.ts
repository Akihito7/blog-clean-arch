import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";

export class CommentRepositoryInMemory
  extends BaseRepositoryInMemory<CommentEntity>
  implements CommentRepositoryInterface {

  async findByPostId(postId: string): Promise<CommentEntity[]> {
    return this.items.filter(comment => comment.props.postId.toLowerCase() === postId.toLowerCase());
  }

  async findByAuthorInPost(authorId: string, postId: string): Promise<CommentEntity[]> {
    return this.items.filter(comment =>
      comment.authorId.toLowerCase() === authorId.toLowerCase()
      && comment.postId.toLowerCase() === postId.toLowerCase())
  }

  async findByAuthor(authorId: string): Promise<CommentEntity[]> {
    return this.items.filter(comment => comment.authorId === authorId)
  }

  async findByContent(content: string): Promise<CommentEntity[]> {
    return this.items.filter(comment => comment.content.toLowerCase().includes(content.toLowerCase()))
  }

}