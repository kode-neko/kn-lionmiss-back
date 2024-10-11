import { Area } from '@model/index';
import IModelDB from './IModelDB';

type IModelDBArticleArea = Pick<IModelDB<Area>, 'read' | 'readList'>;

export default IModelDBArticleArea;
