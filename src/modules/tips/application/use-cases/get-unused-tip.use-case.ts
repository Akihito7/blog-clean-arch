import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { TipRepositoryInterface } from "../../domain/repositories/tip.repository-interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace GetUnusedTip {
  export interface Input {

  }

  export interface Output {
    id: string
    title: string;
    content: string;
    link: string;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly tipRepository: TipRepositoryInterface) { }

    async execute(): Promise<Output> {

      const tipEntity = await this.tipRepository.getUnusedTip();

      if (!tipEntity) throw new NotFoundError("All tips have already been used.");

      return tipEntity.toJson()
    }

  }
}