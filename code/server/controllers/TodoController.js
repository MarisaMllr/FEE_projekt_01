import { todoService } from '../services/TodoService.js';

class TodoController {
    async getAll(req, res) {
        try {
            const todos = await todoService.getAll();
            res.json(todos);
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Laden der Todos',
                error: err.message,
            });
        }
    }

    async getById(req, res) {
        try {
            const todo = await todoService.getById(req.params.id);
            if (!todo) {
                return res.status(404).json({ message: 'Todo nicht gefunden' });
            }
            res.json(todo);
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Laden des Todos',
                error: err.message,
            });
        }
    }

    async create(req, res) {
        if (!req.body.title?.trim()) {
            return res.status(400).json({ message: 'Titel ist erforderlich!' });
        }
        try {
            const todo = await todoService.create(req.body);
            res.status(201).json(todo);
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Erstellen',
                error: err.message,
            });
        }
    }

    async update(req, res) {
        if (!req.body.title?.trim()) {
            return res.status(400).json({ message: 'Titel ist erforderlich!' });
        }
        try {
            await todoService.update(req.params.id, req.body);
            res.json({ message: 'Todo aktualisiert' });
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Aktualisieren',
                error: err.message,
            });
        }
    }

    async delete(req, res) {
        try {
            await todoService.delete(req.params.id);
            res.json({ message: 'Todo gelöscht' });
        } catch (err) {
            res.status(500).json({
                message: 'Fehler beim Löschen',
                error: err.message,
            });
        }
    }
}

export const todoController = new TodoController();
