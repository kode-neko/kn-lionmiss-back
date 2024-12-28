import { ShipStateEnum, PaymentEnum } from '@model/index';
import { z } from 'zod';
import { ArticleValSchema } from './articleVals';

const CartLineValSchema = z.object({
  order: z
    .string(),
  qty: z
    .number()
    .positive()
    .int(),
  article:
    ArticleValSchema
});

const CartValSchema = z.object({
  id: z
    .string()
    .optional(),
  cartLineList: z
    .array(CartLineValSchema)
});

const ShippingtLineValSchema = z.object({
  order: z
    .string(),
  qty: z
    .number()
    .positive()
    .int(),
  article:
    ArticleValSchema
});

const ShipStateEnumValSchema = z.nativeEnum(ShipStateEnum);

const PaymentEnumValSchema = z.nativeEnum(PaymentEnum);

const ShippingValSchema = z.object({
  id: z
    .string()
    .optional(),
  idTracking: z
    .string()
    .optional(),
  state: z
    .record(ShipStateEnumValSchema, z.date()),
  idPayment: z
    .string()
    .optional(),
  payment:
    PaymentEnumValSchema
      .optional(),
  shippingLineList: z
    .array(ShippingtLineValSchema)
});

export {
  CartLineValSchema,
  CartValSchema,
  ShippingtLineValSchema,
  ShippingValSchema
};
