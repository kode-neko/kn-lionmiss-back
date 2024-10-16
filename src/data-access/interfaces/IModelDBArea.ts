import { Area } from '@model/index';
import IModelDB from './IModelDB';

type IModelDBArea = Pick<IModelDB<Area>, 'read' | 'readList'>;

export default IModelDBArea;
