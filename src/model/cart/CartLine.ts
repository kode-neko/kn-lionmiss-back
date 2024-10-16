import { Article } from '@model/index';

interface CartLine {
  id?: string;
  qty: number;
  article: Article;
}

export default CartLine;
