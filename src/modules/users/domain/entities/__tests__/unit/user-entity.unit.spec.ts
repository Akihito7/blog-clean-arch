import { UserPropsFactory } from "src/tests/factories/user-props.factory";
import { UserEntity, UserEntityProps } from "../../user.entity";
import { InvalidContentError } from "src/shared/domain/errors/invalid-content.error";

describe('UserEntity Unit Tests', () => {
  let userProps: UserEntityProps;
  let userEntity: UserEntity;

  beforeEach(() => {
    userProps = UserPropsFactory.create()
    userEntity = new UserEntity(userProps);
  });

  it('should instantiate UserEntity successfully', () => {
    expect(userEntity).toBeDefined();
    expect(userEntity.id).toBeDefined();
    expect(userEntity.toJson()).toStrictEqual({
      id: userEntity.id,
      ...userEntity.props,
    });
  });

  it('should return correct name', () => {
    expect(userEntity.name).toStrictEqual(userProps.name);
  });

  it('should return correct username', () => {
    expect(userEntity.username).toStrictEqual(userProps.username);
  });

  it('should return correct email', () => {
    expect(userEntity.email).toStrictEqual(userProps.email);
  });

  it('should return correct password', () => {
    expect(userEntity.password).toStrictEqual(userProps.password);
  });

  it('should define createdAt on creation', () => {
    expect(userEntity.createdAt).toBeDefined();
  });

  it('should set updatedAt to null on creation', () => {
    expect(userEntity.updatedAt).toStrictEqual(null);
  });

  it('should update email successfully when valid', () => {
    userEntity.updateEmail('otherEmail@gmail.com');
    expect(userEntity.email).toStrictEqual('otherEmail@gmail.com');
  });

  it('should throw error when updating email with invalid value', () => {
    expect(() => userEntity.updateEmail('wrongEmail')).toThrow(new InvalidContentError('Invalid email address.'));
    expect(userEntity.email).not.toStrictEqual('wrongEmail');
  });

  it('should update password successfully when valid', () => {
    userEntity.updatePassword('admin123');
    expect(userEntity.password).toStrictEqual('admin123');
  });

  it('should throw error when updating password with less than 8 characters', () => {
    expect(() => userEntity.updatePassword('test')).toThrow(new InvalidContentError('Password must be at least 8 characters long.'));
    expect(userEntity.password).not.toStrictEqual('test');
  });

  it('should update username successfully when valid', () => {
    userEntity.upatedUsername('janedoetest');
    expect(userEntity.username).toStrictEqual('janedoetest');
  });

  it('should throw error when updating username with less than 6 characters', () => {
    expect(() => userEntity.upatedUsername('aaa')).toThrow(new InvalidContentError('Username must be at least 6 characters long.'));
    expect(userEntity.username).not.toStrictEqual('aaa');
  });
});
