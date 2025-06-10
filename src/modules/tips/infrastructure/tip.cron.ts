import { Inject } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { GetCurrentTip } from "../application/use-cases/get-current-tip.use-case";
import { MarkTipAsUsed } from "../application/use-cases/mark-tip-as-used.use-case";
import { RemoveTipAsCurrent } from "../application/use-cases/remove-tip-as-current";
import { GetUnusedTip } from "../application/use-cases/get-unused-tip.use-case";
import { MarkTipAsCurrent } from "../application/use-cases/mark-tip-as-current";


export class TipCron {
  @Inject(GetCurrentTip.UseCase)
  private readonly getCurrentTipUseCase: GetCurrentTip.UseCase;

  @Inject(MarkTipAsUsed.UseCase)
  private readonly markTipAsUsedUseCase: MarkTipAsUsed.UseCase;

  @Inject(RemoveTipAsCurrent.UseCase)
  private readonly removeTipAsCurrentUseCase: RemoveTipAsCurrent.UseCase;

  @Inject(GetUnusedTip.UseCase)
  private readonly getUnusedTipUseCase: GetUnusedTip.UseCase;

  @Inject(MarkTipAsCurrent.UseCase)
  private readonly markTipAsCurrentUseCase: MarkTipAsCurrent.UseCase;

  @Cron(CronExpression.EVERY_30_MINUTES)
  async handleChangeTip() {

    const currentTip = await this.getCurrentTipUseCase.execute();

    if (!currentTip) {
      const newTip = await this.getUnusedTipUseCase.execute();
      return this.markTipAsCurrentUseCase.execute({ tipId: newTip.id });
    }

    await this.markTipAsUsedUseCase.execute({ tipId: currentTip.id });
    await this.removeTipAsCurrentUseCase.execute();

    const newTip = await this.getUnusedTipUseCase.execute();
    await this.markTipAsCurrentUseCase.execute({ tipId: newTip.id });
  }
}
