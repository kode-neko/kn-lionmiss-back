import { Article } from '../article';

interface CartLine {
  order: string;
  qty: number;

  article: Article;
}

export default CartLine;
