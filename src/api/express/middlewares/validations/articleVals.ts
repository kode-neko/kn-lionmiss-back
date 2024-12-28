import { InstructEnum } from '@model/index';
import { z } from 'zod';
import { PictureValSchema } from './commonVals';

const InstructEnumValSchema = z.nativeEnum(InstructEnum);

const AreaValSchema = z.object({
  id: z
    .string()
    .optional(),
  name: z
    .string(),
  country: z
    .string(),
  locale: z
    .string(),
  currency: z
    .string(),
  dateFormat: z
    .string(),
  gen: z
    .boolean()
});

const ArticleAreaValSchema = z.object({
  id: z
    .string()
    .optional(),
  title: z
    .string(),
  desc: z
    .string(),
  variantList: z
    .record(
      z.string(),
      z.string()
    ),
  price: z
    .number()
    .positive(),
  tax: z
    .number()
    .positive()
    .lte(100),
  area:
    AreaValSchema
});

const ArticleVariantValSchema = z.object({
  id: z
    .string()
    .optional(),
  name: z
    .string(),
  sizes: z
    .record(
      z.string(),
      z.number()
        .positive()
        .int()
    )
});

const ArticleValSchema = z.object({
  id: z
    .string()
    .optional(),
  tags: z
    .array(z.string()),
  materials: z
    .record(
      z.string(),
      z.number()
    ),
  instructs: z
    .record(
      InstructEnumValSchema,
      z.string()
    ),
  discolor: z
    .boolean(),
  articleVariantList: z
    .array(ArticleVariantValSchema),
  pictureList: z
    .array(PictureValSchema),
  articleAreaList: z
    .array(ArticleAreaValSchema)
});

export {
  InstructEnumValSchema,
  AreaValSchema,
  ArticleAreaValSchema,
  ArticleValSchema
};
