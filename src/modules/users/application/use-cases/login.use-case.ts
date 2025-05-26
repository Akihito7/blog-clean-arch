import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { HashProviderInterface } from "../providers/hash-provider.interface";
import { UnauthorizedError } from "src/shared/domain/errors/unauthorized.error";

export namespace Login {

  export interface Input {
    email: string;
    password: string;
  }

  export interface Output {
    id: string;
    name: string;
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly hashProvider: HashProviderInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { email, password } = input;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new UnauthorizedError('Email and/or password invalid.')
      }

      const passwordMatch = await this.hashProvider.compareHash(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedError('Email and/or password invalid.')
      }

      return user.toJson()
    }
  }

}