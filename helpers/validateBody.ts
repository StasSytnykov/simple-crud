import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HttpError } from "./HttpError.ts";

export const validateBody = (schema: Joi.ObjectSchema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};
