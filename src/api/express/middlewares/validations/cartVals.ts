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
    .nullable(),
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
    .nullable(),
  idTracking: z
    .string()
    .nullable(),
  state: z
    .record(ShipStateEnumValSchema, z.date()),
  idPayment: z
    .string()
    .nullable(),
  payment:
    PaymentEnumValSchema
      .nullable(),
  shippingLineList: z
    .array(ShippingtLineValSchema)
});

export {
  CartLineValSchema,
  CartValSchema,
  ShippingtLineValSchema,
  ShippingValSchema
};
