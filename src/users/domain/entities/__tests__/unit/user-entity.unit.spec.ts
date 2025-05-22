import { UserEntity } from "../../user.entity";

describe('UserEntity Unit Tests', () => {
  let userEntity: UserEntity;

  beforeEach(() => {
    userEntity = new UserEntity({
      email: 'test@gmail.com',
      name: 'jane doe',
      username: 'jane',
      password: '1234',
    });
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
    expect(userEntity.name).toStrictEqual('jane doe');
  });

  it('should return correct username', () => {
    expect(userEntity.username).toStrictEqual('jane');
  });

  it('should return correct email', () => {
    expect(userEntity.email).toStrictEqual('test@gmail.com');
  });

  it('should return correct password', () => {
    expect(userEntity.password).toStrictEqual('1234');
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
    expect(() => userEntity.updateEmail('wrongEmail')).toThrow(new Error('Email inválido.'));
    expect(userEntity.email).not.toStrictEqual('wrongEmail');
  });

  it('should update password successfully when valid', () => {
    userEntity.updatePassword('admin123');
    expect(userEntity.password).toStrictEqual('admin123');
  });

  it('should throw error when updating password with less than 8 characters', () => {
    expect(() => userEntity.updatePassword('test')).toThrow(new Error('A senha deve conter no minimo 8 caracteres.'));
    expect(userEntity.password).not.toStrictEqual('test');
  });

  it('should update username successfully when valid', () => {
    userEntity.upatedUsername('janedoetest');
    expect(userEntity.username).toStrictEqual('janedoetest');
  });

  it('should throw error when updating username with less than 6 characters', () => {
    expect(() => userEntity.upatedUsername('aaa')).toThrow(new Error('O username deve conter no minimo 6 caracteres.'));
    expect(userEntity.username).not.toStrictEqual('aaa');
  });
});
