import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface"
import { GetCommentByAuthor } from "../../get-comment-by-author.use-case";
import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";

describe('getCommentByAuthor unit test', () => {
  let commentRepository: CommentRepositoryInterface;
  let SUT: GetCommentByAuthor.UseCase;

  beforeEach(() => {
    commentRepository = new CommentRepositoryInMemory();
    SUT = new GetCommentByAuthor.UseCase(commentRepository)
  })

  it('should get comment by author', async () => {

    const commentEntity = new CommentEntity({
      authorId: 'fakeAuthorId',
      content: 'testing delete comment',
      postId: 'fakePostID',
    });

    commentRepository['items'] = [commentEntity];

    const result = await SUT.execute({ authorId: 'fakeAuthorId' });

    expect(result.data).toHaveLength(1);

    expect(result.data.every(comment => comment.authorId === 'fakeAuthorId')).toBeTruthy();
  });

  it('should return empty array when dont have comment', async () => {
    const result = await SUT.execute({ authorId: 'otherId' });
    expect(result.data).toHaveLength(0)
  })
})