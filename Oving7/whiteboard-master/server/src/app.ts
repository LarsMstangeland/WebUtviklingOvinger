import express from 'express';

/**
 * Express application.
 */
const app = express();

app.use(express.json());

export default app;
