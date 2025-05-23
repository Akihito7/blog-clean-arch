import { PostPropsFactory } from "src/tests/factories/post-props.factory";
import { PostEntity, PostEntityProps } from "../../post.entity";
import { faker } from '@faker-js/faker';

describe('PostEntity Unit Tests', () => {
  let postEntityProps: PostEntityProps;
  let postEntity: PostEntity;

  beforeEach(() => {
    postEntityProps = PostPropsFactory.create();
    postEntity = new PostEntity(postEntityProps);
  });

  it('should create a post', () => {
    expect(postEntity).toBeDefined();
    expect(postEntity.toJson()).toStrictEqual({
      ...postEntityProps,
      id: postEntity.id
    });
  });

  it('should return correct title', () => {
    expect(postEntity.title).toStrictEqual(postEntityProps.title);
  });

  it('should return correct content', () => {
    expect(postEntity.content).toStrictEqual(postEntityProps.content);
  });

  it('should return correct authorId', () => {
    expect(postEntity.authorId).toStrictEqual(postEntityProps.authorId);
  });

  it('should return correct createdAt', () => {
    expect(postEntity.createdAt).toStrictEqual(postEntityProps.createdAt);
  });

  it('should return correct updatedAt', () => {
    expect(postEntity.updatedAt).toStrictEqual(postEntityProps.updatedAt);
  });

  it('should have a defined ID', () => {
    expect(postEntity.id).toBeDefined();
  });

  it('should return correct tags', () => {
    expect(postEntity.tags).toStrictEqual(postEntityProps.tags);
  });

  it('should return correct likes', () => {
    expect(postEntity.likes).toStrictEqual(postEntityProps.likes);
  });

  it('should update title with valid data and correct authorId', () => {
    postEntity.updateTitle('newTitle', postEntity.authorId);
    expect(postEntity.title).toStrictEqual('newTitle');
  });

  it('should not update title if authorId is different', () => {
    expect(() => postEntity.updateTitle('newTitle', 'fakeId')).toThrow('Voce nao tem permissao para mudar o titulo.');
  });

  it('should not update title if it has less than 6 characters', () => {
    expect(() => postEntity.updateTitle('short', postEntity.authorId)).toThrow('Título precisa ser maior que 6 caracteres.');
  });

  it('should update content with valid data and correct authorId', () => {
    const content = faker.lorem.text().repeat(4); 
    postEntity.updateContent(content, postEntity.authorId);
    expect(postEntity.content).toStrictEqual(content);
  });

  it('should not update content if authorId is different', () => {
    const content = faker.lorem.text().repeat(4);
    expect(() => postEntity.updateContent(content, 'fakeId')).toThrow('Voce nao tem permissao para mudar o titulo.');
  });

  it('should not update content if it has less than 64 characters', () => {
    expect(() => postEntity.updateContent('short content', postEntity.authorId)).toThrow('O conteúdo precisa ser maior que 64 caracteres.');
  });

  it('should update tags correctly', () => {
    const newTags = ['tech', 'coding', 'test'];
    postEntity.updateTags(newTags);
    expect(postEntity.tags).toStrictEqual(newTags);
  });

  it('should update tags to empty array', () => {
    const newTags: string[] = [];
    postEntity.updateTags(newTags);
    expect(postEntity.tags).toStrictEqual([]);
  });

  it('should update updatedAt when tags are updated', () => {
    const oldUpdatedAt = postEntity.updatedAt;
    postEntity.updateTags(['js', 'node']);
    expect(postEntity.updatedAt).not.toEqual(oldUpdatedAt);
  });
});
