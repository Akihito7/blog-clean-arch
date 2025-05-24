import { BaseEntity } from "src/shared/domain/entities/base.entity";
import { BaseRepositoryInMemory } from "../../base.repository-in-memory";

interface StubEntityProps {
  name: string;
  price: number;
}

class StubEntity extends BaseEntity {
  constructor(public _props: StubEntityProps) {
    super(_props)
  }

  updateName(name: string) {
    this._props.name = name;
  }

  updatePrice(price: number) {
    this._props.price = price;
  }
}


class StubClassRepository extends BaseRepositoryInMemory<StubEntity> { }

describe('BaseRepositoryInMemory unit tests', () => {

  let SUT: StubClassRepository;
  let entity: StubEntity;

  beforeEach(() => {
    SUT = new StubClassRepository();
    entity = new StubEntity({ name: 'computer', price: 1200 });
  });

  it('should return entity by id', () => {
    SUT.insert(entity);
    const found = SUT.findById(entity.id);
    expect(found).toBe(entity);
  });

  it('should return null if entity is not found by id', () => {
    const found = SUT.findById('non-existent-id');
    expect(found).toBeNull();
  });

  it('should add a new entity to the repository', () => {
    expect(SUT['items']).toHaveLength(0);
    SUT.insert(entity);
    expect(SUT['items']).toHaveLength(1);
  });

  it('should return all stored entities', () => {
    Array.from({ length: 5 }).forEach((_, index) => {
      const entity = new StubEntity({ name: `entity${index}`, price: (index + 1) });
      SUT['items'].push(entity);
    });

    const items = SUT.findMany();

    expect(items.length).toBe(5);
  });

  it('should update an existing entity in the repository', () => {
    SUT['items'].push(entity);
    entity.updateName('otherName');
    entity.updatePrice(777);

    const entityUpdated = SUT.update(entity);
    expect(entityUpdated).toBe(entity);
    expect(entityUpdated._props.name).toStrictEqual('otherName');
    expect(entityUpdated._props.price).toStrictEqual(777);
    expect(SUT['items']).toHaveLength(1);
  });

  it('should throw an error when updating a non-existent entity', () => {
    expect(() => SUT.update(entity)).toThrow('Entity not found.');
  });

  it('should remove an entity from the repository by ID', () => {
    SUT['items'].push(entity);
    expect(SUT['items']).toHaveLength(1);
    SUT.delete(entity.id);
    expect(SUT['items']).toHaveLength(0);
  });

  it('should throw an error when deleting a non-existent entity', () => {
    expect(() => SUT.delete('non-existent-id')).toThrow('Entity not found.');
  });

});
