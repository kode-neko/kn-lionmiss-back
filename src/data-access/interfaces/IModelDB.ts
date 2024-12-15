import { SearchParams } from '@model/index';
import { NotFoundDbException } from '../error';

interface IModelDB<T> {
  read(id: string): Promise<T | NotFoundDbException>;
  readList(searchParams: SearchParams<T>): Promise<T[]>;
  create(obj: T): Promise<T>;
  update(obj: T): Promise<void | NotFoundDbException>;
  delete(id: string): Promise<void | NotFoundDbException>;
}

export default IModelDB;
