
import { z } from 'zod';

function idValSchemaCreateFunc (idName: string) {
  return z.object({
    [idName]: z
      .string()
  });
}

const SearchParamsValSchema = z.object({
  limit: z
    .number()
    .positive()
    .max(50),
  skip: z
    .number(),
  tags: z
    .array(z.string()),
  terms: z
    .array(z.string())
    .optional()
});
// SearchParams.obj is generic type T. We cannot set in zod for the moment...

const UserLoginValSchema = z.object({
  userName: z
    .string(),
  pass: z
    .string()
});

export {
  idValSchemaCreateFunc,
  SearchParamsValSchema,
  UserLoginValSchema
};
