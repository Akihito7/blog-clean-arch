import { faker } from '@faker-js/faker';
import { CommentEntityProps } from 'src/modules/comments/domain/entities/comment.entity';
import { v4 as uuidv4 } from 'uuid';

interface CommentFactoryProps {
  postId: string;
  authorId?: string;
  content?: string;
  createdAt?: Date;
  updatedAt?: Date;
  likes?: number;
}
export class CommentPropsFactory {
  static create(props?: CommentFactoryProps): CommentEntityProps {
    return {
      postId: props?.postId ?? uuidv4(),
      content: props?.content ?? faker.lorem.paragraphs({ min: 64, max: 244 }),
      authorId: props?.authorId ?? uuidv4(),
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? null as any,
      likes: props?.likes ?? faker.number.int({ min: 0, max: 1000 })
    }
  }
}