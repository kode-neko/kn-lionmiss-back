import { Article } from '../article';

interface CartLine {
  order: string;
  qty: number;

  articleId?: string;
  article?: Article;
}

export default CartLine;
