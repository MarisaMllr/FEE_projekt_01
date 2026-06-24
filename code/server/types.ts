import { z } from 'zod';
import { todoDataSchema } from './schemas/todoSchema.js';

export type TodoData = z.infer<typeof todoDataSchema>;

export interface Todo extends TodoData {
    id: string;
}
