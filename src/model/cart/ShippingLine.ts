import { Article } from '../article';

interface ShippingLine {
  order: number;
  qty: number;
  article?: Article;
}

export default ShippingLine;
