import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface"
import { LikeRepositoryInMemory } from "../../like.repository-in-memory";
import { LikeEntity } from "src/modules/likes/domain/entities/like.entity";

describe('likeRepository unit test', () => {
  let SUT: LikeRepositoryInterface;

  beforeEach(() => {
    SUT = new LikeRepositoryInMemory()
  });

  it('should return true when like already exists', async () => {

    const likeEntity = new LikeEntity({ authorId: 'author1', postId: 'post1' });

    await SUT.insert(likeEntity);

    const result = await SUT.exists(likeEntity);

    expect(result).toBeTruthy()
  })


  it('should return false when like not exists', async () => {

    const likeEntity = new LikeEntity({ authorId: 'author1', postId: 'post1' });

    const result = await SUT.exists(likeEntity);

    expect(result).toBeFalsy()
  });


  it('should return many comments by post ', async () => {
    const likesEntity: LikeEntity[] = [];
    Array.from({ length: 6 }).forEach((_, index) => {
      likesEntity.push(new LikeEntity({ authorId: `author${index}`, postId: index < 4 ? 'post1' : 'post2' }));
    });

    SUT['items'] = likesEntity;

    const likes = await SUT.findManyByPost('post2');

    expect(likes).toHaveLength(2);
    expect(likes.every((likeEntity => likeEntity.postId === 'post2'))).toBeTruthy()
  })

})