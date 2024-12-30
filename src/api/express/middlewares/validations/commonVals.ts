import { z } from 'zod';

const PictureValSchema = z.object({
  id: z
    .string()
    .optional(),
  ext: z
    .string(),
  src: z
    .string(),
  alt: z
    .number()
});

const CommentValSchema = z.object({
  id: z
    .string()
    .optional(),
  title: z
    .string(),
  body: z
    .string(),
  rating: z
    .number()
    .int()
    .positive()
    .lte(5),
  pictureList: z
    .array(PictureValSchema),
  idArticle: z
    .string(),
  idUser: z
    .string()
});

export {
  PictureValSchema,
  CommentValSchema
};
