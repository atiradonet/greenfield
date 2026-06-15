import { Router } from 'express';
import type { Request, Response } from 'express';
import { addNote, getNotes } from '../cache.js';

export const notesRouter: Router = Router();

notesRouter.get('/notes', (_req: Request, res: Response): void => {
  res.json(getNotes());
});

notesRouter.post('/notes', (req: Request, res: Response): void => {
  const { text } = req.body as { text?: unknown };

  if (typeof text !== 'string' || text.length === 0) {
    res.status(400).json({ error: 'text is required' });
    return;
  }

  const notes = addNote(text);
  res.status(201).json(notes);
});
