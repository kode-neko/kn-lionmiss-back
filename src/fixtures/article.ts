import casual from 'casual';
import {Article, InstructEnum} from '../model';
import {articleArea} from './articleArea';

const articleList: Article[] = [
  {
    instructs: {
      [InstructEnum.IRONING]: '30º',
      [InstructEnum.WHASING]: '',
      [InstructEnum.SPIN]: '',
      [InstructEnum.DRY_CLEANING]: ''
    },
    sizes: {
      sm: 20,
      md: 30
    },
    materials: {cotton: 30},
    tags: ['woman',
      'dress',
      'black'],
    discolor: casual.coin_flip as boolean,
    articleAreaList: [
      articleArea
    ]
  }
];

export {articleList};
