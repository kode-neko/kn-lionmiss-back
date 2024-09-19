import {z} from 'zod';
import {ArticleValSchema} from './articleVals';

const CartLineValSchema = z.object({
  id: z.string(),
  qty: z.number(),
  article: ArticleValSchema
});

const CartValSchema = z.object({
  id: z.string().nullable(),
  cartLine: z.array(CartLineValSchema)
});
const CarIdtValSchema = CartValSchema.extend({id: z.string()});

export {
  CartLineValSchema, CartValSchema, CarIdtValSchema
};
