import { Area } from '@model/index';
import { ObjectId } from 'mongodb';

type IAreaMongo = Omit<Area, 'id'>;

export default IAreaMongo;
