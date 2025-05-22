import { BaseEntity } from "../../base-entity";

interface StubClassProps {
  name: string;
  price: number;
};

class StubClass extends BaseEntity<StubClassProps> {
  constructor(props: StubClassProps, id?: string) {
    super(props, id);
  }
}

describe('baseEntity unit tests', () => {
  it('should create baseEntity', () => {
    const sut = new StubClass({
      name: 'test',
      price: 12,
    });

    expect(sut.props).toStrictEqual({
      name: 'test',
      price: 12,
    })

    expect(sut.id).toBeDefined();
  });

  it('should create user send id', () => {
    const sut = new StubClass({
      name: 'test',
      price: 12,
    }, 'idTest');

    expect(sut.props).toStrictEqual({
      name: 'test',
      price: 12,
    })

    expect(sut.id).toBeDefined();
    expect(sut.id).toStrictEqual('idTest');
  });


})