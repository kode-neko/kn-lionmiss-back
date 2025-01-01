import { z } from 'zod';
import { AreaValSchema, ArticleValSchema } from './articleVals';
import { CartValSchema, ShippingValSchema } from './cartVals';
import {
  SexEnum, UnitsHeightEnum, UnitsWeightEnum
} from '../../../../model';

const SexEnumValSchema = z.nativeEnum(SexEnum);
const UnitsHeightEnumValSchema = z.nativeEnum(UnitsHeightEnum);
const UnitsWeightEnumValSchema = z.nativeEnum(UnitsWeightEnum);

const AddressValSchema = z.object({
  id: z
    .string()
    .optional(),
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
    .optional()
});

const MeasuresValSchema = z.object({
  shoulder: z
    .number()
    .positive()
    .int()
    .optional(),
  chest: z
    .number()
    .positive()
    .int()
    .optional(),
  waist: z
    .number()
    .positive()
    .int()
    .optional(),
  hips: z
    .number()
    .positive()
    .int()
    .optional(),
  foot: z
    .number()
    .positive()
    .int()
    .optional(),
  height: z
    .number()
    .positive()
    .int()
    .optional(),
  weight: z
    .number()
    .positive()
    .int()
    .optional(),
  unitsHeight:
    UnitsHeightEnumValSchema,
  unitsWeight:
    UnitsWeightEnumValSchema
});

const UserValSchema = z.object({
  id: z
    .string()
    .optional(),
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
