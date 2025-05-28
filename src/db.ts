import { Pool } from 'pg';

// Set up a connection pool with your database credentials
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'todo_db',
  password: '1234',
  port: 5432,
});

// Export the pool so other files can use it to query the database
export default pool;
