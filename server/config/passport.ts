import { PassportStatic } from 'passport';
import passportLocal from 'passport-local';

import models from '../models/index';
import { isUserAdmin, getUserByEmail } from '../models/query-helpers/user';

const LocalStrategy = passportLocal.Strategy;

export default (passport: PassportStatic) => {
  passport.use(
    'local-admin',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await getUserByEmail(email);

        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.comparePassword(password);
        const isAdmin = await isUserAdmin(user.user_id);

        if (isMatch && isAdmin) {
          return done(null, user);
        }
        return done(null, false);
      }
    )
  );

  passport.use(
    'local-customer',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        const user = await getUserByEmail(email);

        if (!user) {
          return done(null, false);
        }

        const isMatch = await user.comparePassword(password);
        const isAdmin = await isUserAdmin(user.user_id);

        if (isMatch && !isAdmin) {
          return done(null, user);
        }
        return done(null, false);
      }
    )
  );

  passport.serializeUser<any, any>((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser<any, any>(async (id, done) => {
    const user = await models.User.findByPk(id);
    done(null, user);
  });
};
