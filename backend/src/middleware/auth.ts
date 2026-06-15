import type { NextFunction, Request, Response } from 'express';
import { loadConfig } from '../config.js';

/**
 * Bearer-token check. If AUTH_TOKEN is not configured the check is skipped,
 * which keeps local development friction-free. When a token is configured,
 * requests must present a matching `Authorization: Bearer <token>` header.
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { authToken } = loadConfig();

  if (authToken === undefined) {
    next();
    return;
  }

  const header = req.header('authorization');
  const expected = `Bearer ${authToken}`;

  if (header !== expected) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
};
