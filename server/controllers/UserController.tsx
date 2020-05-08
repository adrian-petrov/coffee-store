import { Request, Response, NextFunction } from 'express';
import models from '../models/index';
import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import passport from 'passport';

function sanitizeFormData(req: Request, res: Response, next: NextFunction) {
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
  ];
  next();
}

export async function registerUser(req: Request, res: Response) {
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
