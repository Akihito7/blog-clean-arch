import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { ConflictError } from "src/shared/domain/errors/conflict.error";

export namespace UpdateUser {
  export interface Input {
    id: string;
    name: string;
    username: string;
    email: string;
  };

  export interface Output {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  };

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const { id, email, name, username } = input;

      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundError('User not found.')
      };

      if (user.email != email) {
        const userWithNewEmail = await this.userRepository.findByEmail(email);

        if (userWithNewEmail) {
          throw new ConflictError('Email already in use.')
        }
      };

      user.updateEmail(email);
      user.update({ name, username });

      await this.userRepository.update(user)

      return user;

    }
  }
}