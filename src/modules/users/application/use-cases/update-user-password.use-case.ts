import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { HashProviderInterface } from "../../../../shared/application/providers/hash-provider.interface";
import { UnauthorizedError } from "src/shared/domain/errors/unauthorized.error";

export namespace UpdateUserPassword {
  export interface Input {
    id: string;
    password: string;
    newPassword: string;
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

      const { id, password, newPassword } = input;

      const user = await this.userRepository.findById(id);

      if (!user) {
        throw new NotFoundError('User not found.')
      }

      const passwordMatch = await this.hashProvider.compareHash(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedError('Password does not match.')
      }

      user.updatePassword(newPassword);

      await this.userRepository.update(user);

      return user.toJson();

    }
  }


}