import {z} from 'zod';
import UnitsHeightEnum from '../../model/user/UnitsHeightEnum';
import UnitsWeightEnum from '../../model/user/UnitsWeightEnum';
import {AreaValSchema} from './articleVals';
import {CartValSchema} from './cartVals';
import SexEnum from '../../model/user/SexEnum';

const SexEnumValSchema = z.nativeEnum(SexEnum);
const UnitsHeightEnumValSchema = z.nativeEnum(UnitsHeightEnum);
const UnitsWeightEnumValSchema = z.nativeEnum(UnitsWeightEnum);

const AddressValSchema = z.object({
  id: z.string().nullable(),
  alais: z.string(),
  name: z.string(),
  surname: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  phone: z.number(),
  obs: z.string()
});
const AddressIdValSchema = AddressValSchema.extend({id: z.string()});

const CommentValSchema = z.object({
  id: z.string().nullable(),
  title: z.string(),
  cont: z.string(),
  rating: z.number().min(0).
    max(5),
  pics: z.array(z.string()),
  article: z.string()
});
const CommentIdValSchema = CommentValSchema.extend({id: z.string()});

const UserMeasuresValSchema = z.object({
  shoulder: z.number(),
  chest: z.number(),
  waist: z.number(),
  hips: z.number(),
  foot: z.number(),
  height: z.number(),
  weight: z.number(),
  unitsHeight: UnitsHeightEnumValSchema,
  unitsWeight: UnitsWeightEnumValSchema
});

const UserValSchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  bday: z.date(),
  sex: SexEnumValSchema,
  area: AreaValSchema,
  measures: UserMeasuresValSchema,
  commentList: z.array(z.string()),
  addressList: z.array(AddressValSchema),
  favList: z.array(z.string()),
  cart: CartValSchema
});

export {
  SexEnumValSchema,
  UnitsHeightEnumValSchema,
  UnitsWeightEnumValSchema,
  AddressValSchema,
  AddressIdValSchema,
  CommentValSchema,
  CommentIdValSchema,
  UserMeasuresValSchema,
  UserValSchema
};
