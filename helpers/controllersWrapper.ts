import { Request, Response, NextFunction } from "express";

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const controllersWrapper =
  (controller: ControllerType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
