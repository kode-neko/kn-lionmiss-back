import { ObjectId } from 'mongodb';
import { AreaMongo } from '../data-access';

const createAreaMongoListFix: AreaMongo[] = [
  {
    _id: new ObjectId('67743db1e1ddd426cc4f38f2'),
    name: 'spanish',
    country: 'Spain',
    locale: 'es-ES',
    currency: '€',
    dateFormat: 'dd/mm/yyyy',
    gen: true
  },
  {
    _id: new ObjectId(),
    name: 'english-uk',
    country: 'England',
    locale: 'en-GB',
    currency: '€',
    dateFormat: 'dd/mm/yyyy',
    gen: true
  },
  {
    _id: new ObjectId(),
    name: 'english-USA',
    country: 'Spain',
    locale: 'en-US',
    currency: '$',
    dateFormat: 'dd/mm/yyyy',
    gen: false
  }
];

export { createAreaMongoListFix };
