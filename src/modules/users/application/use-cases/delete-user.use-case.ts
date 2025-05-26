import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository.interface";
import { BadRequestError } from "src/shared/domain/errors/bad-request.error";

export namespace DeleteUser {

  export interface Input {
    id: string;
  };

  export class UseCase implements BaseUseCaseInterface<Input, void> {
    constructor(private readonly userRepository: UserRepositoryInterface) { }
    
    async execute(input: Input): Promise<void> {
      const { id } = input;

      if (!id) {
        throw new BadRequestError('id is not provided.')
      }

      this.userRepository.delete(id);
    }
  }
}