import { User } from '@model/article';
import IModelDB from './IModelDB';

type IModelDBUser = Pick<IModelDB<User>, 'read'>;

export default IModelDBUser;
