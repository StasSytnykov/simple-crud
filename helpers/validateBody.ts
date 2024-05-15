import { Request, Response, NextFunction } from "express";
import { HttpError } from "./HttpError";

const validateBody = (schema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next();
  };
};

module.exports = validateBody;
