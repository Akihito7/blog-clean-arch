import { CommentRepositoryInterface } from "src/modules/comments/domain/repositories/comment.repository.interface"
import { UpdateComment } from "../../update-comment.use-case";
import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";

describe('updateCommentUseCase unit test', () => {

  let commentRepository: CommentRepositoryInterface;
  let SUT: UpdateComment.UseCase;
  let commentEntity: CommentEntity;

  beforeEach(() => {
    commentRepository = new CommentRepositoryInMemory();
    SUT = new UpdateComment.UseCase(commentRepository);
    commentEntity = new CommentEntity({
      authorId: 'fakeAuthorId',
      content: 'testing update comment use case',
      postId: 'fakeId',
    });
    commentRepository['items'] = [commentEntity];
  })

  it('should throw error when comment is not found', async () => {
    await expect(() => SUT.execute({
      commentId: 'fakeID',
      content: 'new content updated',
      requesteredId: 'otherFakeId',
    })).rejects.toThrow("Comment not found.")
  })

  it('should throw error when ownner comment is not same that requesteredId', async () => {
    await expect(() => SUT.execute({
      commentId: commentEntity.id,
      content: 'new content updated',
      requesteredId: 'otherFakeId',
    })).rejects.toThrow('You are not allowed to update this comment.')
  });


  it('should update comment with successfully', async () => {
    const result = await SUT.execute({
      commentId: commentEntity.id,
      content: 'new content updated',
      requesteredId: 'fakeAuthorId',
    });

    expect(result.content).toStrictEqual('new content updated');
  })

})