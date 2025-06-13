import { CommentRepositoryInMemory } from "src/modules/comments/infrastructure/database/in-memory/repositories/comment.repository-in-memory";
import { PostEntity } from "src/modules/posts/domain/entities/post.entity"
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface"
import { PostRepositoryInMemory } from "src/modules/posts/infrastructure/database/in-memory/repositories/post.repository-in-memory";
import { AddComment } from "../../add-comment.use-case";

describe('addCommentUseCase unit test', () => {
  let commentRepository: CommentRepositoryInMemory;
  let postRepository: PostRepositoryInterface;
  let post: PostEntity;
  let SUT: AddComment.UseCase


  beforeEach(() => {
    commentRepository = new CommentRepositoryInMemory();
    postRepository = new PostRepositoryInMemory();
    post = new PostEntity({
      authorId: 'fake',
      content: 'fake content',
      title: 'fake title',
      tags: ['fakeTag']
    });
    SUT = new AddComment.UseCase(commentRepository, postRepository);
  });

  it('should add comment to a post with successfully', async () => {
    postRepository['items'] = [post];
    const result = await SUT.execute({ authorId: 'janeDoe', content: 'testing add comment use case', postId: post.id });
    expect(result.authorId).toStrictEqual('janeDoe')
    expect(result.content).toStrictEqual('testing add comment use case')
    expect(result.postId).toStrictEqual(post.id)
    expect(commentRepository['items']).toHaveLength(1)
  });

  it('should throw error when post is not found', async () => {
    await expect(
      () => SUT.execute({ authorId: 'janeDoe', content: 'testing add comment use case', postId: 'fakeId' }))
      .rejects.toThrow("Post with id fakeId not found.")
  })
})