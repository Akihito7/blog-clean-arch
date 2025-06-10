import { TipEntity } from "src/modules/tips/domain/entities/tip.entity";
import { TipRepositoryInterface } from "src/modules/tips/domain/repositories/tip.repository-interface";
import { BaseRepositoryInMemory } from "src/shared/domain/repositories/base.repository-in-memory";
import tips from "src/utils/tips";

export class TipRepositoryInMemory
  extends BaseRepositoryInMemory<TipEntity>
  implements TipRepositoryInterface {

  constructor() {
    super();
    this.items = tips.map((tip) =>
      new TipEntity({
        title: tip.title,
        content: tip.content,
        current: tip.current,
        link: tip.link,
        createdAt: tip.createdAt,
        updatedAt: tip.updatedAt,
        used: tip.used
      }))
  }

  async getCurrentTip(): Promise<TipEntity | undefined> {
    return this.items.find(item => item.current === true);
  }

  async getUnusedTip(): Promise<TipEntity | undefined> {
    return this.items.find(item => item.used === false);
  }
}
