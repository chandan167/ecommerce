import { NextFunction, Request, RequestHandler, Response } from 'express';
import { logger } from '@utils/logger';

export const asyncResolver = (fun: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fun(req, res, next)).catch(error => {
    logger.error(error);
    next(error);
  });
