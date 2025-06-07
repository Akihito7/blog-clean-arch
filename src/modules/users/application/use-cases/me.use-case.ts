import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace Me {
  export interface Input {
    id: string
  }

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

      const { id } = input;

      const user = await this.userRepository.findById(id);

      if (!user) throw new NotFoundError(`User with this id ${id} not found.`);

      return user.toJson();
    }
  }
}