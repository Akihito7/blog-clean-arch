import { v4 as uuidv4 } from "uuid";
import { PostRepositoryInMemory } from "../../post.repository-in-memory";
import { PostEntity } from "src/modules/posts/domain/entities/post.entity";

describe("PostRepositoryInMemory unit tests", () => {
  let SUT: PostRepositoryInMemory;

  beforeEach(() => {
    SUT = new PostRepositoryInMemory();
  });

  it('should return only posts matching the provided authorId', () => {
    const authorId = uuidv4();
    const postsEntity = Array.from({ length: 4 }).map((_, index) =>
      new PostEntity({
        authorId: index < 2 ? authorId : uuidv4(),
        content: 'Desenvolver exige paciência, prática constante e curiosidade e tempo.',
        title: 'testing',
        likes: 10,
        tags: [],
      })
    );

    SUT['items'] = [...postsEntity];

    const posts = SUT.findByAuthor(authorId);
    expect(posts).toHaveLength(2);
    expect(posts.every(post => post.authorId === authorId)).toBeTruthy();
  });

  it('should return no posts if authorId does not match', () => {
    const postsEntity = Array.from({ length: 2 }).map(() =>
      new PostEntity({
        authorId: uuidv4(),
        content: 'Desenvolver exige paciência, prática constante e curiosidade e tempo.',
        title: 'testing',
        likes: 10,
        tags: [],
      })
    );

    SUT['items'] = [...postsEntity];

    const posts = SUT.findByAuthor(uuidv4());
    expect(posts).toHaveLength(0);
  });

  it('should return only posts matching the provided title', () => {
    const titles = ['how to fix bug', 'not includes', 'fakeTitle'];
    const postsEntity = Array.from({ length: 3 }).map((_, index) =>
      new PostEntity({
        authorId: uuidv4(),
        content: 'Desenvolver exige paciência, prática constante e curiosidade e tempo.',
        title: titles[index],
        likes: 10,
        tags: [],
      })
    );

    SUT['items'] = [...postsEntity];

    const posts = SUT.findByTitle('HOW TO FIX BUG');
    expect(posts).toHaveLength(1);
    expect(posts.some(post => post.title.toUpperCase() === 'HOW TO FIX BUG')).toBeTruthy();
  });

  it('should return no posts if title does not match', () => {
    const postsEntity = Array.from({ length: 3 }).map(() =>
      new PostEntity({
        authorId: uuidv4(),
        content: 'Desenvolver exige paciência, prática constante e curiosidade e tempo.',
        title: 'valid title',
        likes: 10,
        tags: [],
      })
    );

    SUT['items'] = [...postsEntity];

    const posts = SUT.findByTitle('nonexistent title');
    expect(posts).toHaveLength(0);
  });

  it('should return only posts that contain the provided tags', () => {
    const tags = [['car', 'soccer'], ['tecnology', 'airplane'], ['social-media'], ['soccer']];

    const postsEntity = tags.map(tag =>
      new PostEntity({
        authorId: uuidv4(),
        content: 'Desenvolver exige paciência, prática constante e curiosidade e tempo.',
        title: 'how to fix',
        likes: 10,
        tags: tag,
      })
    );

    SUT['items'] = [...postsEntity];

    const posts = SUT.findByTags(['soccer']);

    expect(posts).toHaveLength(2);
    expect(posts.every(post => post.tags?.includes('soccer'))).toBe(true);
    expect(posts.every(post => !post.tags?.includes('wrong'))).toBe(true);
  });

  it('should return no posts if none match the provided tags', () => {
    const tags = [['car'], ['airplane'], ['tecnology']];

    const postsEntity = tags.map(tag =>
      new PostEntity({
        authorId: uuidv4(),
        content: 'Desenvolver exige paciência, prática constante e curiosidade e tempo.',
        title: 'how to fix',
        likes: 10,
        tags: tag,
      })
    );

    SUT['items'] = [...postsEntity];

    const posts = SUT.findByTags(['nonexistent', 'unknown']);
    expect(posts).toHaveLength(0);
  });
});
