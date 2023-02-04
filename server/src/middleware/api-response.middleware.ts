import { ApiResponse } from '@utils/api-response';
import { RequestHandler } from 'express';

export const apiResponse: RequestHandler = (req, res, next) => {
  res.apiResponse = new ApiResponse(res);
  next();
};
