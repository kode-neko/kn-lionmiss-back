import { Area } from '@model/index';
import IModelDB from './IModelDB';
import { NotFoundDbException } from '../error';

interface IModelDBArea extends IModelDB<Area> {
  readByProps(obj: Omit<Area, 'id'>): Promise<Area | NotFoundDbException>;
}

export default IModelDBArea;
