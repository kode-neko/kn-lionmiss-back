import {Cart} from '@model/index';
import {articleList} from './article';

const cart: Cart = {
  cartLines: [
    {
      id: '1',
      qty: 1,
      article: articleList[0]
    },
    {
      id: '2',
      qty: 1,
      article: articleList[0]
    }
  ]
};

export {cart};
