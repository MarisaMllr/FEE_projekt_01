import { Router } from 'express';
import { todoController } from '../controllers/TodoController.js';

const router = Router();

router.get('/', (req, res) => todoController.getAll(req, res));
router.get('/:id', (req, res) => todoController.getById(req, res));
router.post('/', (req, res) => todoController.create(req, res));
router.put('/:id', (req, res) => todoController.update(req, res));
router.delete('/:id', (req, res) => todoController.delete(req, res));

export default router;
