import { LikeRepositoryInterface } from "src/modules/likes/domain/repositories/like.repository.interface";
import { ListLike } from "../../list-like.use-case"
import { LikeRepositoryInMemory } from "src/modules/likes/infrastructure/database/in-memory/like.repository-in-memory";
import { UserRepositoryInterface } from "src/modules/users/domain/repositories/user.repository.interface";
import { UserRepositoryInMemory } from "src/modules/users/infrastructure/database/in-memory/user.repository-in-memory";
import { LikeEntity } from "src/modules/likes/domain/entities/like.entity";
import { _ } from "@faker-js/faker/dist/airline-BUL6NtOJ";
import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { UserPropsFactory } from "src/tests/factories/user-props.factory";

describe('listLikeUseCase unit test', () => {
  let SUT: ListLike.UseCase;
  let likeRepository: LikeRepositoryInterface;
  let userRepository: UserRepositoryInterface;
  let usersEntity: UserEntity[]

  beforeAll(() => {
    likeRepository = new LikeRepositoryInMemory();
    userRepository = new UserRepositoryInMemory();
    SUT = new ListLike.UseCase(likeRepository, userRepository);

    usersEntity = Array.from({ length: 4 })
      .map((_, index) => new UserEntity(UserPropsFactory.create({ name: `name${index}` })));
    userRepository['items'] = usersEntity

  })


  it('should return list like', async () => {
    const likeEntity = Array.from({ length: 4 })
      .map((_, index) => new LikeEntity({ authorId: usersEntity[index].id, postId: 'post1' }))
    likeRepository['items'] = likeEntity;

    const result = await SUT.execute({ postId: 'post1' });
    expect(result).toStrictEqual({
      data: likeEntity.map((like, index) => ({
        authorName: usersEntity.find(userEntity => userEntity.id === like.authorId)?.name,
        ...like.toJson()
      }))
    })
  })

  it('should return empty list', async () => {
    const result = await SUT.execute({ postId: 'fakeId' })
    expect(result.data).toHaveLength(0)
  })
})