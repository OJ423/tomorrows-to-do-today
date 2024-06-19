import { z } from 'zod';

export const listSchema = z.object({
  list_name: z.string(),
  list_desc: z.string(),
  list_cat: z.string(),
});