import { Router } from 'express';
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todosController';

const router = Router();

router.get('/', getTodos);            // GET /todos
router.get('/:id', getTodoById);      // GET /todos/:id
router.post('/', createTodo);         // POST /todos
router.put('/:id', updateTodo);       // PUT /todos/:id
router.delete('/:id', deleteTodo);    // DELETE /todos/:id

export default router;
