import {z} from 'zod';

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
  SearParamsValSchema,
  UserLoginValSchema
};
