import {z} from 'zod';

const IdValSchema = z.object({id: z.string()});

function createIdNameValSchemaFunc (idName: string) {
  return z.object({[idName]: z.string()});
}

const SearParamsValSchema = z.object({
  limit: z.number().positive().
    max(50),
  skip: z.number(),
  tags: z.array(z.string()),
  terms: z.array(z.string())
});

const UserLoginValSchema = z.object({
  userName: z.string(),
  pass: z.string()
});

export {
  IdValSchema,
  createIdNameValSchemaFunc,
  SearParamsValSchema,
  UserLoginValSchema
};
