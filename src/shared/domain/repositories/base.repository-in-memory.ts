import { BaseEntity } from "../entities/base.entity";
import { NotFoundError } from "../errors/not-found.error";
import { BaseRepository } from "./base.repository";


export abstract class BaseRepositoryInMemory<Data extends BaseEntity> implements BaseRepository<Data> {
  protected items: Data[] = [];

  async findById(id: string) {
    const item = this.items.find(item => item.id.toString() === id?.toString());
    return item ?? null
  }

  async findMany(): Promise<Data[]> {
    return this.items;
  }

  async insert(entity: Data): Promise<Data> {
    this.items.push(entity);
    return entity
  }

  async update(entity: Data): Promise<Data> {
    const entityExists = this.entityExists(entity.id);

    if (!entityExists) throw new NotFoundError('Entity not found.');

    const indexItem = this.items.findIndex(item => item.id.toString() === entity.id.toString());

    this.items[indexItem] = entity;

    return entity
  };

  async delete(id: string): Promise<void> {
    const entityExists = this.entityExists(id);

    if (!entityExists) throw new NotFoundError('Entity not found.');

    const indexUser = this.items.findIndex(item => item.id.toString() === id.toString());

    this.items.splice(indexUser, 1);

  }

  private entityExists(id: string): boolean {
    return this.items.some(item => item.id.toString() === id.toString());
  }
}