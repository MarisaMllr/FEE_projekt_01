import { Request, Response } from 'express';
import { todoService } from '../services/TodoService.js';
import { todoDataSchema } from '../schemas/todoSchema.js';

class TodoController {
    async getAll(_req: Request, res: Response): Promise<void> {
        try {
            const todos = await todoService.getAll();
            res.json(todos);
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Laden der Todos',
                error: (err as Error).message,
            });
        }
    }

    async getById(req: Request, res: Response): Promise<void> {
        try {
            const todo = await todoService.getById(String(req.params['id']));
            if (!todo) {
                res.status(404).json({ message: 'Todo nicht gefunden' });
                return;
            }
            res.json(todo);
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Laden des Todos',
                error: (err as Error).message,
            });
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const result = todoDataSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ message: result.error.issues[0].message });
            return;
        }
        try {
            const todo = await todoService.create(result.data);
            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Erstellen',
                error: (err as Error).message,
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const result = todoDataSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({ message: result.error.issues[0].message });
            return;
        }
        try {
            await todoService.update(String(req.params['id']), result.data);
            res.json({ message: 'Todo aktualisiert' });
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Aktualisieren',
                error: (err as Error).message,
            });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            await todoService.delete(String(req.params['id']));
            res.json({ message: 'Todo gelöscht' });
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Löschen',
                error: (err as Error).message,
            });
        }
    }
}

export const todoController = new TodoController();
