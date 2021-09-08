import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const urlValidationRules = () => {
  return [check("longUrl", "URL is required").not().isEmpty()]; //Long url is required
};

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let messages: string[] = [];
    errors.array().forEach((error) => {
      messages.push(error.msg);
    });

    return res.status(500).send({ message: messages });
  }
  return next();
};
