import { Request, Response } from "express";
import pool from "../db";
import { getTodoByIdDB } from "../db/todo";

// GET /todos
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT * FROM todos ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// GET /todos/:id
export const getTodoById = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const todo = await getTodoByIdDB(id);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
  } else {
    res.status(200).json(todo);
  }
};

// POST /todos
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  const { title, description, completed } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING *",
      [title, description, completed]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// PUT /todos/:id
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  try {
    const result = await pool.query(
      "UPDATE todos SET title = $1, description = $2, completed = $3 WHERE id = $4 RETURNING *",
      [title, description, completed, id]
    );
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// DELETE /todos/:id
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM todos WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Todo not found" });
    } else {
      res.status(200).json({ message: "Todo deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
