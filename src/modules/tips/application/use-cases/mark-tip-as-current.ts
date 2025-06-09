import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { TipRepositoryInterface } from "../../domain/repositories/tip.repository-interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";
import { ConflictError } from "src/shared/domain/errors/conflict.error";

export namespace MarkTipAsCurrent {
  export interface Input {
    tipId: string
  }

  export interface Output {
    title: string;
    content: string;
    link: string;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly tipRepository: TipRepositoryInterface) { }

    async execute(input: Input): Promise<Output> {

      const alreadyExistsTipCurrent = await this.tipRepository.getCurrentTip();

      if(alreadyExistsTipCurrent) throw new ConflictError("Already current tip");

      const { tipId } = input;

      const tipEntity = await this.tipRepository.findById(tipId);

      if (!tipEntity) throw new NotFoundError(`Tip with id ${tipId} not found.`);

      tipEntity.markAsCurrent();

      await this.tipRepository.update(tipEntity);

      return tipEntity.toJson()
    }

  }
}