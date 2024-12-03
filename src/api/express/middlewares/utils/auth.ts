import { Request } from 'express';
import { AuthException } from '../error';

function extractHeader (req: Request): string {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AuthException('There is no "Authorization" header');
  return authHeader;
}

export { extractHeader };
