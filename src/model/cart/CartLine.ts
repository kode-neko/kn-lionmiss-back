import {Article} from '@model/article';

interface CartLine {
  id: string;
  qty: number;
  article: Article;
}

export default CartLine;
