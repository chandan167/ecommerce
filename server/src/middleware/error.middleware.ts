import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'http-errors';
import { logger } from '@utils/logger';
import { ErrorMessageTypeEnum } from '@utils/api-response';
import { NODE_ENV } from '@/config/env.config';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware = (error: Error | any, req: Request, res: Response, next: NextFunction) => {
  const status: number = error.status || 500;
  const message: string = error.message || 'Something went wrong';
  if (error instanceof HttpError) {
    return res.apiResponse.setMessage(message, ErrorMessageTypeEnum.ERROR).setStatus(status).sendJson();
  }

  if (NODE_ENV == 'development' || NODE_ENV == 'test') {
    return res.apiResponse.setMessage(message, ErrorMessageTypeEnum.ERROR).setStatus(status).setData({ stack: error.stack }).sendJson();
  }
  logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
  return res.apiResponse.setMessage('Something went wrong', ErrorMessageTypeEnum.ERROR).setStatus(StatusCodes.INTERNAL_SERVER_ERROR).sendJson();
};

export default errorMiddleware;
