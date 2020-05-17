import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors: { [key: string]: string } = {};
  /**
   * validationResult() also returns the input value which could be the password
   * send back to client only object with field name and corresponding error
   */
  errors.array().map((err) => (extractedErrors[err.param] = err.msg));

  return res.status(409).send({ errors: extractedErrors });
}
