import { BaseEntity } from "../entities/base.entity";
import { BaseRepository } from "./base.repository";


export abstract class BaseRepositoryInMemory<Data extends BaseEntity> implements BaseRepository<Data> {
  protected items: Data[] = [];

  findById(id: string) {
    const item = this.items.find(item => item.id.toString() === id.toString());
    return item ?? null
  }

  findMany(): Data[] {
    return this.items;
  }

  async insert(entity: Data): Promise<Data> {
    this.items.push(entity);
    return entity
  }

  update(entity: Data): Data {
    const entityExists = this.entityExists(entity.id);

    if (!entityExists) throw new Error('Entity not found.');

    const indexItem = this.items.findIndex(item => item.id.toString() === entity.id.toString());

    this.items[indexItem] = entity;

    return entity
  };

  delete(id: string): void {
    const entityExists = this.entityExists(id);

    if (!entityExists) throw new Error('Entity not found.');

    const indexUser = this.items.findIndex(item => item.id.toString() === id.toString());

    this.items.splice(indexUser, 1);

  }

  private entityExists(id: string): boolean {
    return this.items.some(item => item.id.toString() === id.toString());
  }
}