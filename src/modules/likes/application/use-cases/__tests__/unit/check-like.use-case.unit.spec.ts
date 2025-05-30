import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { CheckLike } from "../../check-like.use-case"
import { LikeRepositoryInMemory } from "src/modules/likes/infrastructure/database/in-memory/like.repository-in-memory";
import { PostRepositoryInterface } from "src/modules/posts/domain/repositories/post.repository.interface";
import { PostEntity } from "src/modules/posts/domain/entities/post.entity";
import { PostPropsFactory } from "src/tests/factories/post-props.factory";
import { PostRepositoryInMemory } from "src/modules/posts/infrastructure/database/in-memory/repositories/post.repository-in-memory";
import { LikeEntity } from "src/modules/likes/domain/entities/like.entity";

describe('checkLikeUseCase unit test', () => {
  let SUT: CheckLike.UseCase;
  let likeRepository: LikeRepositoryInterface;
  let postRepository: PostRepositoryInterface;

  beforeEach(() => {
    likeRepository = new LikeRepositoryInMemory();
    postRepository = new PostRepositoryInMemory();
    SUT = new CheckLike.UseCase(likeRepository);
  });

  it('should return false when like not exists', async () => {
    const result = await SUT.execute({ authorId: 'autor1', postId: 'postFake' });
    expect(result.likeExists).toBeFalsy()
  })


  it('should return true when like already exists', async () => {
    const postEntity = new PostEntity(PostPropsFactory.create());
    const likeEntity = new LikeEntity({ authorId: 'autor1', postId: postEntity.id })
    likeRepository['items'] = [likeEntity];

    const result = await SUT.execute({ authorId: 'autor1', postId: postEntity.id });
    expect(result.likeExists).toBeTruthy()
  })
})