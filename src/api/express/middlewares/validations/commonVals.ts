import { z } from 'zod';

const PictureValSchema = z.object({
  id: z
    .string(),
  ext: z
    .string(),
  src: z
    .string(),
  alt: z
    .number()
});

const CommentValSchema = z.object({
  id: z
    .string(),
  title: z
    .string(),
  body: z
    .string(),
  rating: z
    .number()
    .positive()
    .gte(5),
  pictureList: z
    .array(PictureValSchema)
});

export {
  PictureValSchema,
  CommentValSchema
};
