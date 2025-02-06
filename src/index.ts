import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();
const port = process.env.PORT || 3000;

// Load the Swagger document
const swaggerDocument = YAML.load('./api-docs.yaml');

// Serve Swagger UI at /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello, DevOps World!');
});

// Health-check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

// A sample API endpoint (e.g., for user info)
app.get('/api/users', (req, res) => {
  // In a real application, you might fetch users from a database
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.json(users);
});

// Global error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

