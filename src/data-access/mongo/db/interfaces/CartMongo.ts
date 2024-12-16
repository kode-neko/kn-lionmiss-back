import { ObjectId } from 'mongodb';
import ArticleMongo from './ArticleMongo';

interface CartMongo {
  _id?: ObjectId;
  cartLineList: {
    order: string;
    qty: number;
    article: ArticleMongo['_id'];
  }[];
}

export default CartMongo;
