import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";
import { LikeEntity } from "../../like.entity"
import { ConflictError } from "src/shared/domain/errors/conflict.error";
import { v4 as uuuidv4 } from "uuid";

describe('likeEntity unit test', () => {
  let SUT: LikeEntity;

  it('should return error when author is not provided', () => {
    expect(() => new LikeEntity({ authorId: null as any, postId: 'fakePost' }))
      .toThrow(new ForbiddenError('Does not can give like without an account.'))
  })

  it('should return error when post is not provided', () => {
    expect(() => new LikeEntity({ authorId: 'fakeAuthor', postId: null as any }))
      .toThrow(new ConflictError('PostId is not provided.'))
  })

  it('should create like entity', () => {

    const id = uuuidv4()
    const createdAt = new Date();

    SUT = new LikeEntity({ authorId: 'author1', postId: 'post1', createdAt }, id);

    expect(SUT.id).toBeDefined();
    expect(SUT.toJson()).toStrictEqual({
      id,
      authorId: 'author1',
      postId: 'post1',
      createdAt
    })
  })

})