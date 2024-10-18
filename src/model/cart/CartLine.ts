import { Article } from '@model/index';

interface CartLine {
  id: number;
  qty: number;
  article: Article;
}

export default CartLine;
