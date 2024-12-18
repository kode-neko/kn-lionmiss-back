import { Article } from '../article';

interface CartLine {
  order: number;
  article: Article;
  qty: number;
}

export default CartLine;
