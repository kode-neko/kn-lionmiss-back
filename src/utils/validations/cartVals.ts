import {z} from 'zod';
import {ArticleValSchema} from './articleVals';
import ShipStateEnum from '../../model/cart/ShipStateEnum';
import PaymentEnum from '../../model/cart/PaymentEnum';

const CartLineValSchema = z.object({
  id: z.string(),
  qty: z.number(),
  article: ArticleValSchema
});

const CartValSchema = z.object({
  id: z.string().nullable(),
  cartLine: z.array(CartLineValSchema)
});
const CarIdtValSchema = CartValSchema.extend({id: z.string()});

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

const ShippingIdValSchema = ShippingValSchema.extend({id: z.string()});

export {
  CartLineValSchema,
  CartValSchema,
  CarIdtValSchema,
  ShippingValSchema,
  ShippingIdValSchema
};
