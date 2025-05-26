import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInMemory } from "../../infrastructure/database/in-memory/user.repository-in-memory";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace GetUser {
  export interface Input {
    id: string;
  }

  interface Output {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  };


  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(private readonly userRepository: UserRepositoryInMemory) { }

    async execute(input: Input): Promise<Output> {
      const { id } = input;

      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundError('User not found.')
      }

      return user;
    }
  }
}