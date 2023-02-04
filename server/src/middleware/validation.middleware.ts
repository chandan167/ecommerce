import { NextFunction, Request, RequestHandler, Response } from "express";
import { ValidationChain, matchedData } from "express-validator";
import { StatusCodes } from "http-status-codes";

const { validationResult } = require('express-validator');

const myValidationResult = validationResult.withDefaults({
  formatter: error => {
    return error
  },
});

export const validationHandler: RequestHandler = (req: Request, res:Response, next:NextFunction) =>{
  const errors = myValidationResult(req).mapped();
  if(Object.keys(errors).length) return res.apiResponse.setValidationError(errors).setStatus(StatusCodes.UNPROCESSABLE_ENTITY).sendJson()
  req.body = matchedData(req, { locations: ['body'] });
  next();
}

export const validateSchema = (schema: ValidationChain[]) =>{
  return [schema, validationHandler] as RequestHandler|any
}