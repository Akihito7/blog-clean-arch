import { PostEntity } from "src/modules/posts/domain/entities/post.entity";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";

export class
  PostRepositoryInMemory
  extends BaseRepositoryInMemory<PostEntity>
  implements PostRepositoryInterface {
    
  findByTags(tags: string[]): PostEntity[] {
    return this.items.filter(post => post.tags?.some(tag => tags.includes(tag)));
  }

  findByAuthor(authorId: string): PostEntity[] {
    return this.items.filter(post => post.authorId === authorId)
  }

  findByTitle(title: string): PostEntity[] {
    return this.items.filter(post => post.title.toLowerCase() === title.toLowerCase())
  }

}