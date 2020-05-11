import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as UserController from '../controllers/userController';
import {
  sanitizeRegisterForm,
  validate,
  sanitizeLoginForm,
} from '../middlewares/userMiddleware';

const router = express.Router();

router.post(
  '/register',
  sanitizeRegisterForm(),
  validate,
  UserController.registerUser
);

router.post(
  '/login',
  sanitizeLoginForm(),
  passport.authenticate('local-customer', { failWithError: true }),
  UserController.loginUser,
  (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(401).send({ errors: err });
  }
);

router.get('/logout', UserController.logoutUser);

export default router;
