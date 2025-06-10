import { BaseUseCaseInterface } from "src/shared/application/use-cases/base-use-case";
import { input, output } from "zod";
import { TipRepositoryInterface } from "../../domain/repositories/tip.repository-interface";
import { NotFoundError } from "src/shared/domain/errors/not-found.error";

export namespace GetCurrentTip {
  export interface Input {

  }

  export type Output = {
    id : string
    title: string;
    content: string;
    link: string;
    used: boolean;
    createdAt: Date;
    updatedAt: Date;
  } | null

  export class UseCase implements BaseUseCaseInterface<Input, Output> {

    constructor(private readonly tipRepository: TipRepositoryInterface) { }

    async execute(): Promise<Output> {

      const tipEntity = await this.tipRepository.getCurrentTip();

      if (!tipEntity) return null

      return tipEntity.toJson()
    }

  }
}