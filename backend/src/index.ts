import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import { loadConfig } from './config.js';
import { notesRouter } from './routes/notes.js';

const app = express();
const config = loadConfig();

app.use(express.json());

app.get('/health', (_req: Request, res: Response): void => {
  res.status(200).json({ status: 'ok' });
});

app.use('/notes', notesRouter);

// Basic error-handling middleware.
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  },
);

app.listen(config.port, (): void => {
  console.log(`Backend listening on port ${config.port}`);
});

export { app };
