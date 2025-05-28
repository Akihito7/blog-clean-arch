import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { LikeRepositoryInterface } from "../../domain/repositories/like.repository.interface";
import { ForbiddenError } from "src/shared/domain/errors/forbidden.error";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace RemoveLike {

  export interface Input {
    id: string;
    requesterId: string;
  }

  export type Output = void;

  export class UseCase implements BaseUseCaseInterface<Input, Output> {
    constructor(private readonly likeRepository: LikeRepositoryInterface) { }
    
    async execute(input: Input): Promise<Output> {

      const { id, requesterId } = input;

      const likeEntity = await this.likeRepository.findById(id);

      if (!likeEntity) throw new NotFoundError('Like not found.')

      const ownerMatch = requesterId.toLowerCase() === likeEntity.authorId.toLowerCase();

      if (!ownerMatch) throw new ForbiddenError("You can only remove your own like.");

      await this.likeRepository.delete(id);
    }
  }
}