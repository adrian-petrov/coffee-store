import models from '../models/index';
import { check } from 'express-validator';

/**
 * common validate() is to be used in conjunction
 * with sanitizeRegisterForm() only
 * sanitizeLoginForm() should not use validate() because it already
 * uses passport.js validation through failWithError flag
 * which passes errors to the next middleware
 */
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
