import { SearchParams } from '@model/index';
import { NotFoundDbException } from '../error';

interface IModelDB<T> {
  read(id: string): Promise<T> | NotFoundDbException;
  readList(searchParams?: SearchParams): Promise<T[]>;
  create(obj: Exclude<T, 'id'>): Promise<T>;
  update(obj: T & { id: string }): Promise<void> | NotFoundDbException;
  delete(id: string): Promise<void> | NotFoundDbException;
}

export default IModelDB;
