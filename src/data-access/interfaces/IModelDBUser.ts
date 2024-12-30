
import { User } from '../../model';
import IModelDB from './IModelDB';

type IModelDBUser = Pick<IModelDB<User>, 'read'>;

export default IModelDBUser;
