import { Types } from 'mongoose';

interface IArticleMongo {
  _id?: Types.ObjectId;
  instructs: Map<string, string>;
  sizes: Map<string, number>;
  materials: Map<string, number>;
  tags: string[];
  discolor: boolean;
}

export default IArticleMongo;
