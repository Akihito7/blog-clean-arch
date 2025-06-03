import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { ConflictError } from "src/shared/domain/errors/conflict.error";
import { UserEntity } from "../../domain/entities/user.entity";
import { HashProviderInterface } from "../../../../shared/application/providers/hash-provider.interface";

export namespace CreateAccountUser {

  export interface Input {
    name: string;
    username: string;
    email: string;
    password: string;
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

    constructor(
      private readonly userRepository: UserRepositoryInterface,
      private readonly hashProvider: HashProviderInterface
    ) { }

    async execute(input: Input): Promise<Output> {

      const { email, password } = input;

      const emailExists = await this.userRepository.emailExists(email);

      if (emailExists) {
        throw new ConflictError('Email already exists. Try another email.')
      }

      const passwordHashed = await this.hashProvider.generateHash(password);

      const userEntity = new UserEntity({ ...input, password: passwordHashed });

      this.userRepository.insert(userEntity);

      return userEntity.toJson()
    }
  }
}


