import { Article } from '@model/index';

interface ShippingLine {
  id?: string;
  qty: number;
  article: Article;
}

export default ShippingLine;
