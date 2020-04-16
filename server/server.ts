import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';

import models from './models/index';

require('dotenv').config();

const app: Application = express();
const port = parseInt(process.env.SERVER_PORT || '8080');
const host = process.env.SERVER_HOST;

// top-level middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// sync models and start server
models.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${host}:${port}`);
  });
});
