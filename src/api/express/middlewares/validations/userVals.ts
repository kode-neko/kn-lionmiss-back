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
    .string(),
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
    .nullable(),
  chest: z
    .number()
    .nullable(),
  waist: z
    .number()
    .nullable(),
  hips: z
    .number()
    .nullable(),
  foot: z
    .number()
    .nullable(),
  height: z
    .number()
    .nullable(),
  weight: z
    .number()
    .nullable(),
  unitsHeight:
    UnitsHeightEnumValSchema,
  unitsWeight:
    UnitsWeightEnumValSchema
});

const UserValSchema = z.object({
  id: z
    .string(),
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
    .array(z.string()),
  cart:
    CartValSchema,
  shippings: z
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
