import { ShipStateEnum, PaymentEnum } from '@model/index';
import { z } from 'zod';
import { ArticleValSchema } from './articleVals';

const CartLineValSchema = z.object({
  id: z
    .string(),
  qty: z
    .number(),
  article:
    ArticleValSchema
});

const CartValSchema = z.object({
  id: z
    .string()
    .nullable(),
  lines: z
    .array(CartLineValSchema)
});

const ShippingtLineValSchema = z.object({
  id: z
    .string(),
  qty: z
    .number(),
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
    .string(),
  idShipping: z
    .string(),
  state: z
    .record(ShipStateEnumValSchema, z.date()),
  payment:
    PaymentEnumValSchema,
  lines: z
    .array(ShippingtLineValSchema)
});

export {
  CartLineValSchema,
  CartValSchema,
  ShippingtLineValSchema,
  ShippingValSchema
};
