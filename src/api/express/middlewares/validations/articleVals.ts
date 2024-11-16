import { InstructEnum } from '@model/index';
import { z } from 'zod';

const InstructEnumValSchema = z.nativeEnum(InstructEnum);

const AreaValSchema = z.object({
  id: z
    .string()
    .nullable(),
  name: z
    .string(),
  country: z
    .string()
});

const ArticleAreaValSchema = z.object({
  id: z
    .string()
    .nullable(),
  title: z
    .string(),
  desc: z
    .string(),
  price: z
    .number(),
  tax: z
    .number(),
  area:
    AreaValSchema
});

const ArticleValSchema = z.object({
  id: z
    .string()
    .nullable(),
  instructs: z
    .record(
      InstructEnumValSchema,
      z.string()
    ),
  sizes: z
    .record(
      z.string(),
      z.number()
    ),
  materials: z
    .record(
      z.string(),
      z.number()
    ),
  tags: z
    .array(z.string()),
  variants: z
    .array(z.string()),
  discolor: z
    .boolean(),
  articleAreaList: z
    .array(ArticleAreaValSchema)
});

export {
  InstructEnumValSchema,
  AreaValSchema,
  ArticleAreaValSchema,
  ArticleValSchema
};
