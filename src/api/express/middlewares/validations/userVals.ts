import { z } from 'zod';
import {
  SexEnum, UnitsHeightEnum, UnitsWeightEnum
} from '@model/index';
import { AreaValSchema } from './articleVals';
import { CartValSchema, ShippingValSchema } from './cartVals';

const SexEnumValSchema = z.nativeEnum(SexEnum);
const UnitsHeightEnumValSchema = z.nativeEnum(UnitsHeightEnum);
const UnitsWeightEnumValSchema = z.nativeEnum(UnitsWeightEnum);

const AddressValSchema = z.object({
  id: z
    .string()
    .nullable(),
  alais: z
    .string(),
  name: z
    .string(),
  surname: z
    .string(),
  address: z
    .string(),
  city: z
    .string(),
  state: z
    .string(),
  country: z
    .string(),
  phone: z
    .string(),
  obs: z
    .string()
});

const CommentValSchema = z.object({
  id: z
    .string()
    .nullable(),
  title: z
    .string(),
  cont: z
    .string(),
  rating: z
    .number()
    .min(0)
    .max(5),
  pics: z
    .array(z.string()),
  article: z
    .string()
});

const UserMeasuresValSchema = z.object({
  shoulder: z
    .number(),
  chest: z
    .number(),
  waist: z
    .number(),
  hips: z
    .number(),
  foot: z
    .number(),
  height: z
    .number(),
  weight: z
    .number(),
  unitsHeight:
    UnitsHeightEnumValSchema,
  unitsWeight:
    UnitsWeightEnumValSchema
});

const UserValSchema = z.object({
  id: z
    .string()
    .nullable(),
  userName: z
    .string(),
  email: z
    .string()
    .email(),
  cart:
    CartValSchema,
  shippings: z
    .array(ShippingValSchema),
  bday: z
    .date(),
  sex:
    SexEnumValSchema,
  area:
    AreaValSchema,
  measures:
    UserMeasuresValSchema,
  favs: z
    .array(z.string()),
  addresses: z
    .array(AddressValSchema)
});

export {
  SexEnumValSchema,
  UnitsHeightEnumValSchema,
  UnitsWeightEnumValSchema,
  AddressValSchema,
  CommentValSchema,
  UserMeasuresValSchema,
  UserValSchema
};
