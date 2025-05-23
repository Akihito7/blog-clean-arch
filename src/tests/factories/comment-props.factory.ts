import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CommentEntityProps } from "src/modules/comments/domain/entities/comment.entity";

export class CommentPropsFactory {
  static create(props?: CommentEntityProps): CommentEntityProps {
    return {
      content: props?.content ?? faker.lorem.paragraphs(),
      authorId: props?.authorId ?? uuidv4(),
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? null as any,
      likes: props?.likes ?? faker.number.int({ min: 0, max: 1000 })
    }
  }
}