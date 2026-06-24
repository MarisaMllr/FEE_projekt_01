import { z } from 'zod';

export const todoDataSchema = z.object({
    title: z.string().trim().min(1, 'Titel ist erforderlich!'),
    done: z.boolean().optional(),
});
