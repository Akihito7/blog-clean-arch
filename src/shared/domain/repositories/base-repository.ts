export interface BaseRepository<Data = any> {
  findById(): Data | null;
  findMany(): Data[];
  insert(props: Data): void;
  update(props: Date): void;
  delete(id: string): void;
}