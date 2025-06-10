import { Controller, Get, Inject } from "@nestjs/common";
import { GetCurrentTip } from "../application/use-cases/get-current-tip.use-case";


@Controller('tip')
export class TipController {

  @Inject(GetCurrentTip.UseCase)
  private readonly getCurrentTipUseCase: GetCurrentTip.UseCase;

  @Get('current')
  async getCurrentTip() {
    return this.getCurrentTipUseCase.execute();
  }
}