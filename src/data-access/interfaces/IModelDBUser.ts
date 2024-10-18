import { User } from '@model/article';
import IModelDB from './IModelDB';

type IModelDBUser = Pick<IModelDB<User>, 'read' | 'update'>;

export default IModelDBUser;
