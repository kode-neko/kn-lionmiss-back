import { Types } from 'mongoose';

interface IArticleMongoose {
  _id?: Types.ObjectId;
  instructs: Map<string, string>;
  sizes: Map<string, number>;
  materials: Map<string, number>;
  tags: string[];
  variants: string[];
  discolor: boolean;
  articleAreaList: Types.ObjectId[];
}

export default IArticleMongoose;
