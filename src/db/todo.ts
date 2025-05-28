import pool from "../db";

type Todo = {
  id: number;
  name: string;
  completed: boolean;
};

export const getTodoByIdDB = async (id: string): Promise<Todo | undefined> => {
  const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
  return result.rows[0];
};
