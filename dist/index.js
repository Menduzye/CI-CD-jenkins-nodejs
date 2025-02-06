"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const yamljs_1 = __importDefault(require("yamljs"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Load the Swagger document
const swaggerDocument = yamljs_1.default.load('./api-docs.yaml');
// Serve Swagger UI at /api-docs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
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
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
