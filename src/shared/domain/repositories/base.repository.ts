export interface BaseRepository<Data = any> {
  findById(id: string): Promise<Data | null>;
  findMany(): Promise<Data[]>;
  insert(entity: Data): Promise<Data>;
  update(entity: Data): Promise<Data>;
  delete(id: string): Promise<void>;
}