import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { CommentRepositoryInMemory } from "../../comment.repository-in-memory";
import { v4 as uuidv4 } from "uuid";

describe("CommentRepositoryInMemory unit tests", () => {
  let SUT: CommentRepositoryInMemory;

  beforeEach(() => {
    SUT = new CommentRepositoryInMemory();
  });

  it('should return only comments matching the provided authorId', async () => {
    const entityId = uuidv4();
    const commentsEntity = Array.from({ length: 4 }).map((_, index) =>
      new CommentEntity({ authorId: index < 2 ? entityId : uuidv4(), content: 'hello people', likes: 10, postId: 'fake' })
    );

    SUT['items'] = [...commentsEntity];

    const comments = await SUT.findByAuthor(entityId);
    expect(comments.every(c => c.authorId === entityId)).toBe(true);
    expect(comments.length).toBe(2);
  });

  it('should return comments that contain the given content string (case-insensitive)', async () => {
    const elementsContent = ['test bug', 'TEST things', 'nothing includes', 'nothing to test'];
    const commentsEntity = Array.from({ length: 4 }).map((_, index) =>
      new CommentEntity({ authorId: uuidv4(), content: elementsContent[index], likes: 10, postId: 'fake' })
    );

    SUT['items'] = [...commentsEntity];

    const comments = await SUT.findByContent('test');
    expect(comments.length).toBe(3);
    expect(comments.map(comment => comment.content)).toEqual(
      expect.arrayContaining([
        'test bug',
        'TEST things',
        'nothing to test'
      ])
    );
  });
});
