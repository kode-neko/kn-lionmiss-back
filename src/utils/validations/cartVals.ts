import { z } from 'zod';
import { ArticleValSchema } from './articleVals';
import ShipStateEnum from '../../model/cart/ShipStateEnum';
import PaymentEnum from '../../model/cart/PaymentEnum';

const CartLineValSchema = z.object({
  id: z.string(),
  qty: z.number(),
  article: ArticleValSchema
});

const CartValSchema = z.object({
  id: z.string().nullable(),
  lines: z.array(CartLineValSchema)
});

const ShipStateEnumValSchema = z.nativeEnum(ShipStateEnum);
const PaymentEnumValSchema = z.nativeEnum(PaymentEnum);

const ShippingValSchema = z.object({
  id: z.string().nullable(),
  idTracking: z.string(),
  idShipping: z.string(),
  state: z.record(
    ShipStateEnumValSchema,
    z.date()
  ),
  payment: PaymentEnumValSchema
});

export {
  CartLineValSchema,
  CartValSchema,
  ShippingValSchema
};
