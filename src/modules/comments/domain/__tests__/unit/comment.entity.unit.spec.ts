import { CommentEntity } from "src/modules/comments/domain/entities/comment.entity";
import { CommentPropsFactory } from "src/tests/factories/comment-props.factory";


describe("CommentEntity", () => {
  it("should create a valid comment with default values", () => {
    const props = CommentPropsFactory.create();
    const comment = new CommentEntity({ ...props, content: '1fjsdkfjskdfjs;fjs;fjsd;f' });

    expect(comment.content).toBe('1fjsdkfjskdfjs;fjs;fjsd;f');
    expect(comment.authorId).toBe(props.authorId);
    expect(comment.createdAt).toBeInstanceOf(Date);
    expect(comment.updatedAt).toBeNull();
    expect(comment.likes).toBe(props.likes);
  });

  it("should default likes to 0 if not provided", () => {
    const props = CommentPropsFactory.create({ likes: undefined });
    console.log(props.content.length)
    const comment = new CommentEntity({ ...props, content: '1fjsdkfjskdfjs;fjs;fjsd;f', likes: undefined });

    expect(comment.likes).toBe(0);
  });

  it("should throw an error if content is empty", () => {
    const props = CommentPropsFactory.create({ content: "  " });

    expect(() => new CommentEntity(props)).toThrow("Comment must have content.");
  });

  it("should throw an error if content is shorter than 4 characters", () => {
    const props = CommentPropsFactory.create({ content: '123' });

    expect(() => new CommentEntity(props)).toThrow("Comment must be at least 4 characters long.");
  });

  it("should throw an error if content is longer than 512 characters", () => {
    const longContent = "a".repeat(513);
    const props = CommentPropsFactory.create({ content: longContent });

    expect(() => new CommentEntity(props)).toThrow("Comment must be at most 512 characters long.");
  });

  it("should update content successfully if author matches", () => {
    const props = CommentPropsFactory.create({ content: "Old content" });
    const comment = new CommentEntity(props);

    const newContent = "Updated valid content";
    comment.updateContent(newContent, props.authorId);

    expect(comment.content).toBe(newContent);
    expect(comment.updatedAt).toBeInstanceOf(Date);
  });

  it("should throw an error when updating content with wrong author", () => {
    const props = CommentPropsFactory.create({ content: "Original content" });
    const comment = new CommentEntity(props);

    expect(() => comment.updateContent("Trying to update", "wrong-author-id"))
      .toThrow("You are not allowed to update this comment.");
  });
});
