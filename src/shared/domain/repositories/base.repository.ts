export interface BaseRepository<Data = any> {
  findById(id : string): Data | null;
  findMany(): Data[];
  insert(entity: Data): void;
  update(entity: Data): Data;
  delete(entity: string): void;
}