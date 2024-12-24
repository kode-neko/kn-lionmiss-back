import { z } from 'zod';
import {
  SexEnum, UnitsHeightEnum, UnitsWeightEnum
} from '@model/index';
import { AreaValSchema, ArticleValSchema } from './articleVals';
import { CartValSchema, ShippingValSchema } from './cartVals';

const SexEnumValSchema = z.nativeEnum(SexEnum);
const UnitsHeightEnumValSchema = z.nativeEnum(UnitsHeightEnum);
const UnitsWeightEnumValSchema = z.nativeEnum(UnitsWeightEnum);

const AddressValSchema = z.object({
  id: z
    .string()
    .nullable(),
  alias: z
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
    .nullable()
});

const MeasuresValSchema = z.object({
  shoulder: z
    .number()
    .positive()
    .int()
    .nullable(),
  chest: z
    .number()
    .positive()
    .int()
    .nullable(),
  waist: z
    .number()
    .positive()
    .int()
    .nullable(),
  hips: z
    .number()
    .positive()
    .int()
    .nullable(),
  foot: z
    .number()
    .positive()
    .int()
    .nullable(),
  height: z
    .number()
    .positive()
    .int()
    .nullable(),
  weight: z
    .number()
    .positive()
    .int()
    .nullable(),
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
  pass: z
    .string(),
  salt: z
    .string(),
  email: z
    .string()
    .email(),
  bday: z
    .date(),
  sex:
    SexEnumValSchema,
  area:
    AreaValSchema,
  measures:
    MeasuresValSchema,
  addressList: z
    .array(AddressValSchema),
  favList: z
    .array(ArticleValSchema),
  cart:
    CartValSchema,
  shippingsList: z
    .array(ShippingValSchema)
});

export {
  SexEnumValSchema,
  UnitsHeightEnumValSchema,
  UnitsWeightEnumValSchema,
  AddressValSchema,
  MeasuresValSchema,
  UserValSchema
};
