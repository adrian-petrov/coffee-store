import { Request, Response, NextFunction } from 'express';
import models from '../models/index';
import { check, validationResult } from 'express-validator';
import { runInNewContext } from 'vm';

/**
 * validate() is to be used in conjunction with sanitizeRegisterForm() only
 * sanitizeLoginForm() uses passport.js validation through failWithError flag
 * which passes errors to the next middleware
 */
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

export function sanitizeRegisterForm() {
  return [
    check('email')
      .isEmail()
      .bail()
      .normalizeEmail()
      .custom((value) => {
        return models.User.findOne({
          where: {
            email: value,
          },
        }).then((email: string) => {
          if (email) {
            return Promise.reject('Email already in use');
          }
        });
      }),
    check('firstName').trim().escape().notEmpty().isLength({ min: 2 }),
    check('lastName').trim().escape().notEmpty().isLength({ min: 2 }),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
  ];
}

export function sanitizeLoginForm() {
  return [
    check('email').isEmail().bail().normalizeEmail(),
    check('password').exists({ checkFalsy: true }),
  ];
}
