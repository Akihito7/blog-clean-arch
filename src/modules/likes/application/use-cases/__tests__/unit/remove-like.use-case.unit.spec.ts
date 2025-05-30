import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { RemoveLike } from "../../remove-like.use-case"
import { LikeRepositoryInMemory } from "src/modules/likes/infrastructure/database/in-memory/like.repository-in-memory";
import { LikeEntity } from "src/modules/likes/domain/entities/like.entity";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

describe('removeLikeUseCase unit test', () => {
  let SUT: RemoveLike.UseCase;
  let likeRepository: LikeRepositoryInterface;
  let likeEntity: LikeEntity;

  beforeAll(() => {
    likeRepository = new LikeRepositoryInMemory();
    SUT = new RemoveLike.UseCase(likeRepository);
  })

  beforeEach(() => {
    likeEntity = new LikeEntity({ authorId: 'author', postId: 'post1' });
    likeRepository['items'] = [likeEntity];
  });

  it('should remove like', async () => {
    await expect(SUT.execute({ id: likeEntity.id, requesterId: 'author' })).resolves.not.toThrow();
    expect(likeRepository['items']).toHaveLength(0)
  })

  it('should throw error when user is not owner like', async () => {
    await expect(() => SUT.execute({ id: likeEntity.id, requesterId: 'notOwner' }))
      .rejects.toThrow(new ForbiddenError("You can only remove your own like."))
  })

  it('should throw error when like is not found', async () => {
    await expect(() => SUT.execute({ id: 'fakeId', requesterId: 'notOwner' }))
      .rejects.toThrow(new NotFoundError("Like not found."))
  })
})