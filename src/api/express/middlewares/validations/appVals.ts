import { z } from 'zod';

const IdValSchema = z.object({ id: z.string() });

function idValSchemaCreateFunc (idName: string) {
  return z.object({
    [idName]: z
      .string()
  });
}

const SearParamsValSchema = z.object({
  limit: z
    .number()
    .positive()
    .max(50),
  skip: z
    .number(),
  tags: z
    .array(z.string())
    .nullable(),
  terms: z
    .array(z.string())
    .nullable()
});
// SearchParams.obj is generic type T. We cannot set in zod for the moment...

const UserLoginValSchema = z.object({
  userName: z
    .string(),
  pass: z
    .string()
});

export {
  IdValSchema,
  idValSchemaCreateFunc,
  SearParamsValSchema,
  UserLoginValSchema
};
