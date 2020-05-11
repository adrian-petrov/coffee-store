import { Request, Response, NextFunction } from 'express';
import models from '../models/index';
import bcrypt from 'bcrypt';

export async function registerUser(req: Request, res: Response) {
  const { firstName, lastName, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await models.User.create({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
    });
    /**
     * create user role based on referer path
     * if path === /admin/register set role_id to 3 (admin)
     * else if path === /register set role_id to 1 (customer)
     */
    const referer = req.get('Referer');
    const refererPath = referer?.slice(-15);

    if (refererPath === '/admin/register') {
      await newUser.setRoles(3);
    } else {
      await newUser.setRoles(1);
    }
  } catch (err) {
    console.log(err);
  }
  res.status(200).send('Happy days');
}

export async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await models.User.findByPk(req.session!.passport.user);
  const firstName = user.get('first_name');
  const lastName = user.get('last_name');
  res.status(200).send({
    isAuthenticated: req.isAuthenticated(),
    authUser: `${firstName} ${lastName}`,
  });
}

export function logoutUser(req: Request, res: Response, next: NextFunction) {
  req.logout();

  if (req.session) {
    req.session.destroy((err) => console.log(err));
    if (!req.user) {
      res.send({ signedOut: true });
    }
  }
}
