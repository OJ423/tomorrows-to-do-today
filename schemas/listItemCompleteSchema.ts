import { boolean, z } from 'zod';

export const listItemCompleteSchema = z.object({
  completed: z.boolean()
});