import express from 'express';
import todoRoutes from './routes/todos';

const app = express();
const PORT = 3000;

app.use(express.json());           // Enables parsing JSON request bodies
app.use('/todos', todoRoutes);     // Mounts routes on /todos

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
