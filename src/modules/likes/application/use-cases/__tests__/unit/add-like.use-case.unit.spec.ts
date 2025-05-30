import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { AddLike } from "../../add-like.use-case"
import { LikeRepositoryInMemory } from "src/modules/likes/infrastructure/database/in-memory/like.repository-in-memory";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { PostRepositoryInMemory } from "src/modules/posts/infrastructure/database/in-memory/repositories/post.repository-in-memory";
import { PostEntity } from "src/modules/posts/domain/entities/post.entity";
import { PostPropsFactory } from "src/tests/factories/post-props.factory";
import { ConflictError } from "src/shared/domain/errors/conflict.error";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

describe('addLikeUseCase unit test', () => {
  let SUT: AddLike.UseCase;
  let likeRepository: LikeRepositoryInterface;
  let postRepository: PostRepositoryInterface;
  let postEntity: PostEntity;


  beforeEach(() => {
    likeRepository = new LikeRepositoryInMemory();
    postRepository = new PostRepositoryInMemory()
    SUT = new AddLike.UseCase(likeRepository, postRepository);
    postEntity = new PostEntity(PostPropsFactory.create())
    postRepository['items'] = [postEntity]
  });


  it('should added new like', async () => {
    const result = await SUT.execute({ authorId: 'author1', postId: postEntity.id });
    expect(result).toStrictEqual({
      id: result.id,
      authorId: 'author1',
      postId: postEntity.id,
      createdAt: result.createdAt
    });
    expect(likeRepository['items']).toHaveLength(1);
  })

  it('should throw error when like already exists', async () => {
    const input: AddLike.Input = { authorId: 'author1', postId: postEntity.id }
    await SUT.execute(input);

    await expect(SUT.execute(input)).rejects.toThrow(new ConflictError('User already liked this post.'))
  })

  it('should throw error when post not found', async () => {
    const input: AddLike.Input = { authorId: 'author1', postId: 'fakeId' }
    await expect(SUT.execute(input)).rejects.toThrow(new NotFoundError('Post not found.'))
  })
})