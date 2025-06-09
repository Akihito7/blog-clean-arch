import { BaseRepository } from "src/shared/domain/repositories/base.repository";
import { TipEntity } from "../entities/tip.entity";

export interface TipRepositoryInterface extends BaseRepository<TipEntity> {
  getUnusedTip(): Promise<TipEntity>;
  getCurrentTip(): Promise<TipEntity>
}