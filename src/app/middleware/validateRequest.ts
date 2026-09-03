import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { z } from "zod";

export const validateRequest = (ZodSchema: z.ZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // const payload = req.body ? req.body: {};

    const payload = req.body ?? {};
    const result = ZodSchema.safeParse(payload);
    if (!result.success) {
      throw new Error(result.error.issues[0].message);
    }

    req.body = result.data;
    next();
  });
};
