import { Module } from "@nestjs/common";
import { TipController } from "./tip.controller";
import { GetCurrentTip } from "../application/use-cases/get-current-tip.use-case";
import { TipRepositoryInMemory } from "./database/in-memory/tip.repository-in-memory";
import { TipRepositoryInterface } from "../domain/repositories/tip.repository-interface";
import { MarkTipAsUsed } from "../application/use-cases/mark-tip-as-used.use-case";
import { RemoveTipAsCurrent } from "../application/use-cases/remove-tip-as-current";
import { GetUnusedTip } from "../application/use-cases/get-unused-tip.use-case";
import { MarkTipAsCurrent } from "../application/use-cases/mark-tip-as-current";
import { TipCron } from "./tip.cron";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [TipController],
  providers: [
    {
      provide: 'TipRepository',
      useClass: TipRepositoryInMemory
    },
    {
      provide: GetCurrentTip.UseCase,
      useFactory: (tipRepository: TipRepositoryInterface) => {
        return new GetCurrentTip.UseCase(tipRepository)
      },
      inject: ['TipRepository']
    },
    {
      provide: MarkTipAsUsed.UseCase,
      useFactory: (tipRepository: TipRepositoryInterface) => {
        return new MarkTipAsUsed.UseCase(tipRepository)
      },
      inject: ['TipRepository']
    },
    {
      provide: RemoveTipAsCurrent.UseCase,
      useFactory: (tipRepository: TipRepositoryInterface) => {
        return new RemoveTipAsCurrent.UseCase(tipRepository)
      },
      inject: ['TipRepository']
    },
    {
      provide: GetUnusedTip.UseCase,
      useFactory: (tipRepository: TipRepositoryInterface) => {
        return new GetUnusedTip.UseCase(tipRepository)
      },
      inject: ['TipRepository']
    },
    {
      provide: MarkTipAsCurrent.UseCase,
      useFactory: (tipRepository: TipRepositoryInterface) => {
        return new MarkTipAsCurrent.UseCase(tipRepository)
      },
      inject: ['TipRepository']
    },
    TipCron,
  ]
})
export class TipModule { }