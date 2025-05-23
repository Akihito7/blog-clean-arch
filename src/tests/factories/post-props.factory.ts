import { PostEntityProps } from "src/modules/posts/domain/entities/post.entity";
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';

export class PostPropsFactory {
  static create(props?: PostEntityProps): PostEntityProps {
    return {
      title: props?.title ?? faker.lorem.sentence(),
      content: props?.content ?? faker.lorem.paragraphs(),
      authorId: props?.authorId ?? uuidv4(),
      createdAt: props?.createdAt ?? new Date(),
      updatedAt: props?.updatedAt ?? null as any,
      tags: faker.helpers.arrayElements(
        ['tech', 'life', 'health', 'sports', 'music', 'finance'],
        faker.number.int({ min: 1, max: 3 })
      ),
      likes: props?.likes ?? faker.number.int({ min: 0, max: 1000 })
    }
  }
}