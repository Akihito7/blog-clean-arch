import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory"
import { DeleteComment } from "../../delete-comment.use-case";
import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";

describe('deleteCommentUseCase unit test', () => {
  let commentRepository: CommentRepositoryInMemory;
  let SUT: DeleteComment.UseCase

  beforeEach(() => {
    commentRepository = new CommentRepositoryInMemory();
    SUT = new DeleteComment.UseCase(commentRepository);
  });

  it('should delete comment with successfully', async () => {

    const commentEntity = new CommentEntity({
      authorId: 'fakeAuthorId',
      content: 'testing delete comment',
      postId: 'fakePostID',
    });

    commentRepository['items'] = [commentEntity];

    await expect(SUT.execute({ commentId: commentEntity.id, requesteredId: 'fakeAuthorId' })).resolves.toBeUndefined();
  });

  it('should throw error when comment is not found', async () => {
    await expect(() => SUT.execute({ commentId: 'fakeId', requesteredId: 'janeDoe' })).rejects.toThrow('Comment not found.')
  })


  it('should throw error when comment is not found', async () => {
    const commentEntity = new CommentEntity({
      authorId: 'fakeAuthorId',
      content: 'testing delete comment',
      postId: 'fakePostID',
    });

    commentRepository['items'] = [commentEntity];

    await expect(() => SUT.execute({ commentId: commentEntity.id, requesteredId: 'otherId' }))
      .rejects.toThrow('User dont have permission.')
  })

})