import { Article } from '../article';

interface CartLine {
  order: number;
  qty: number;
  article: Article;
}

export default CartLine;
