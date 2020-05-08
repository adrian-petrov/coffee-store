import express, { Request, Response, NextFunction } from 'express';
import models from '../models/index';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import passport from 'passport';

const router = express.Router();

router.post(
  '/register',
  [
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
    check('firstName').trim().escape().notEmpty(),
    check('lastName').trim().escape().notEmpty(),
    check('password').exists({ checkFalsy: true }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(409).send({ errors: errors.mapped() });
    }

    const { firstName, lastName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      // create user
      const newUser = await models.User.create({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: hashedPassword,
      });
      // create user_role with role of 'admin' (role_id = 3)
      await newUser.setRoles(3);
    } catch (err) {
      console.log(err);
    }
    res.status(200).send('Happy days');
  }
);

router.post(
  '/login',
  [
    check('email').isEmail().bail().normalizeEmail(),
    check('password').exists({ checkFalsy: true }),
  ],
  passport.authenticate('local', { failWithError: true }),
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await models.User.findByPk(req.session!.passport.user);
    const firstName = user.get('first_name');
    const lastName = user.get('last_name');
    res.status(200).send({
      isAuthenticated: req.isAuthenticated(),
      authUser: `${firstName} ${lastName}`,
    });
  },
  (err, req, res, next) => {
    res.status(401).send({ errors: err });
  }
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logout();

  if (req.session) {
    req.session.destroy((err) => console.log(err));
  }

  if (!req.user) {
    res.send({ signedOut: true });
  }
});

export default router;
