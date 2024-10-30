import { Area } from '@model/index';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBArea extends IModelDB<Area> {
  readByProps(obj: Partial<Area>): Promise<Area> | NotFoundDbException;
}

export default IModelDBArea;
