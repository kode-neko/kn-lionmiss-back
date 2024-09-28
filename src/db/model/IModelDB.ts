import { SearchParams } from '@model/index';

interface IModelDB<T> {
  read(id: string): Promise<T>;
  readList(searchParams?: SearchParams): Promise<T[]>;
  create(obj: T): Promise<T>;
  update(obj: T): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export default IModelDB;
