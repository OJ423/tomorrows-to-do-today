import { z } from 'zod';

export const listItemSchema = z.object({
  list_item_desc: z.string(),
});