import { Article } from '@model/index';

interface ShippingLine {
  id: number;
  qty: number;
  article?: Article;
}

export default ShippingLine;
