import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import * as UserController from '../controllers/userController';
import {
  sanitizeLoginForm,
  sanitizeRegisterForm,
  validate,
} from '../middlewares/userMiddleware';

import productsRoute from './productsRoute';

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
  passport.authenticate('local-admin', { failWithError: true }),
  UserController.loginUser,
  (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(401).send({ errors: err });
  }
);

router.get('/logout', UserController.logoutUser);

router.use('/products', productsRoute);

export default router;
