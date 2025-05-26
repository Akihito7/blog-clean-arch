import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { UserRepositoryInMemory } from "../../user.repository-in-memory";
import { UserPropsFactory } from "src/tests/factories/user-props.factory";

describe('UserRepositoryInMemory unit tests', () => {
  let SUT: UserRepositoryInMemory;
  let entity: UserEntity;

  beforeAll(() => {
    SUT = new UserRepositoryInMemory();
  });

  beforeEach(() => {
    entity = new UserEntity(UserPropsFactory.create());
    SUT['items'] = [entity];
  });

  it('should return the correct user when email exists', async () => {
    const user = await SUT.findByEmail(entity.email);
    expect(user).toBeDefined();
    expect(user!.toJson()).toStrictEqual(entity.toJson());
  });

  it('should throw an error when trying to find a user by a non-existent email', async () => {
    await expect(SUT.findByEmail('emailFake')).rejects.toThrow(new Error(`User with this email emailFake not found`));
  });

  it('should return true when checking if an existing email exists', async () => {
    const emailExists = await SUT.emailExists(entity.email);
    expect(emailExists).toBeTruthy();
  });

  it('should return false when checking if a non-existent email exists', async () => {
    const emailExists = await SUT.emailExists('emailFake');
    expect(emailExists).toBeFalsy();
  });
});
