import { Schema } from 'mongoose';
import IAreaMongo from '../interfaces/IAreaMongo';

const areaSchemaMongo = new Schema<IAreaMongo>({
  name: String,
  country: String,
  symbol: {
    type: String,
    maxlength: 1
  }
});

export default areaSchemaMongo;
