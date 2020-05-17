import express, { Application } from 'express';
import session from 'express-session';
import sessionSequelize from 'connect-session-sequelize';
import passport from 'passport';

import passportConfig from './config/passport';
import models from './models/index';
import indexRoute from './routes/indexRoute';
import adminRoute from './routes/adminRoute';

require('dotenv').config();

const app: Application = express();
const { SERVER_PORT } = process.env;
const { SERVER_HOST } = process.env;
const { SESSION_SECRET } = process.env;
const SequelizeStore = sessionSequelize(session.Store);

// top-level middleware
passportConfig(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      httpOnly: true,
    },
    store: new SequelizeStore({
      db: models.sequelize,
      table: 'session',
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  console.log(req.session);
  next();
});

// routes
app.use('/', indexRoute);
app.use('/admin', adminRoute);

// sync models and start server
models.sequelize.sync().then(async () => {
  // Default rows

  // Role
  await models.Role.findOrCreate({
    where: { role_type: 'customer' },
    defaults: { role_type: 'customer' },
  });
  await models.Role.findOrCreate({
    where: { role_type: 'visitor' },
    defaults: { role_type: 'visitor' },
  });
  await models.Role.findOrCreate({
    where: { role_type: 'admin' },
    defaults: { role_type: 'admin' },
  });

  // Category
  await models.Category.findOrCreate({
    where: { category_name: 'coffee' },
    defaults: { category_name: 'coffee' },
  });
  await models.Category.findOrCreate({
    where: { category_name: 'brewing equipment' },
    defaults: { category_name: 'brewing equipment' },
  });
  await models.Category.findOrCreate({
    where: { category_name: 'gifts' },
    defaults: { category_name: 'gifts' },
  });

  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on ${SERVER_HOST}:${SERVER_PORT}`);
  });
});
