import request from 'supertest';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Import your Express app (if you exported it from your main file)
// For this example, we'll re-create a simple version of the app.
const app = express();
const port = process.env.PORT || 3000;

// Load Swagger document if needed (not necessary for these tests)
// const swaggerDocument = YAML.load('./api-docs.yaml');
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Define endpoints (these should match your actual implementation)
app.get('/', (req, res) => {
  res.send('Hello, DevOps World!');
});

app.get('/health', (req, res) => {
  res.json({ status: 'UP' });
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];
  res.json(users);
});

// Basic test cases
describe('GET /', () => {
  it('should return "Hello, DevOps World!"', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello, DevOps World!');
  });
});

describe('GET /health', () => {
  it('should return JSON with status UP', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'UP' });
  });
});

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });
});
