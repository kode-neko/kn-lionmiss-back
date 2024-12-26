import { Article } from '../article';

interface ShippingLine {
  order: string;
  qty: number;

  articleId?: string;
  article?: Article;
}

export default ShippingLine;
