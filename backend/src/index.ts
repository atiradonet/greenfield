import express from 'express';
import type { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import { config } from './config.js';
import { notesRouter } from './routes/notes.js';

// Stubbed upstream health probe. Used by /health to optionally confirm a
// downstream dependency is reachable when UPSTREAM_HEALTH_URL is configured.
async function checkUpstream(url: string): Promise<boolean> {
  try {
    const { status } = await axios.get(url, { timeout: 1000 });
    return status >= 200 && status < 300;
  } catch {
    return false;
  }
}

const app = express();
app.use(express.json());

app.get('/health', async (_req: Request, res: Response): Promise<void> => {
  const upstream = process.env.UPSTREAM_HEALTH_URL;
  const upstreamOk = upstream ? await checkUpstream(upstream) : true;
  res.status(200).json({ status: 'ok', upstreamOk });
});

app.use(notesRouter);

// Basic error-handling middleware.
app.use((err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(config.port, (): void => {
  console.log(`Housing Notes backend listening on port ${config.port}`);
});
