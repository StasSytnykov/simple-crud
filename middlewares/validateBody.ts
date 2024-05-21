import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { HttpError } from "../helpers/HttpError.ts";

export const validateBody =
  (schema: Joi.ObjectSchema, message?: string) =>
  (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, message ? message : error.message));
    }
    next();
  };
