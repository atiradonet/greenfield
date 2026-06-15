import { Router } from 'express';
import type { Request, Response } from 'express';
import { addNote, getNotes } from '../cache.js';
import { requireAuth } from '../middleware/auth.js';

interface CreateNoteBody {
  text?: unknown;
}

export const notesRouter: Router = Router();

notesRouter.get('/', requireAuth, (_req: Request, res: Response): void => {
  res.json(getNotes());
});

notesRouter.post('/', requireAuth, (req: Request, res: Response): void => {
  const { text } = req.body as CreateNoteBody;

  if (typeof text !== 'string' || text.trim().length === 0) {
    res.status(400).json({ error: 'A non-empty "text" field is required' });
    return;
  }

  const notes = addNote(text.trim());
  res.status(201).json(notes);
});
