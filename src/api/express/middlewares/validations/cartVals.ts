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
  articleId: z
    .string()
    .optional(),
  article:
    ArticleValSchema
      .optional()
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
  articleId: z
    .string()
    .optional(),
  article:
    ArticleValSchema
      .optional()
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
    .record(ShipStateEnumValSchema, z.date())
    .optional(),
  idPayment: z
    .string()
    .optional(),
  payment:
    PaymentEnumValSchema
      .optional(),
  shippingLineList: z
    .array(ShippingtLineValSchema)
});

const ShippingOpsValSchema = ShippingValSchema.pick({
  idTracking: true,
  state: true,
  idPayment: true,
  payment: true
});

export {
  CartLineValSchema,
  CartValSchema,
  ShippingtLineValSchema,
  ShippingValSchema
};
