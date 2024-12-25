import { Article } from '../article';

interface ShippingLine {
  order: string;
  qty: number;
  article: Article;
}

export default ShippingLine;
