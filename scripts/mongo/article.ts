import { ObjectId } from 'mongodb';
export default [
  {
    _id: new ObjectId('66db3e857f97b60ae12b4a1e'),
    tags: [
      'female',
      'dress',
      'short',
      'summer'
    ],
    sizes: {
      s: 20,
      m: 4,
      l: 20
    },
    variants: [
      'red',
      'green',
      'stripes'
    ],
    materials: {
      cotton: 30,
      rayon: 70
    },
    instructs: {
      whasing: '30º',
      ironing: '180º',
      spining: 'low',
      dryCleaning: 'no'
    },
    discolor: false
  }

];
