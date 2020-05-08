import { Sequelize, Model, BuildOptions, DATE, STRING } from 'sequelize';

interface SessionModel extends Model {
  sid: string;
  expires: Date;
  data: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type SessionStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SessionModel;
};

export function Session(sequelize: Sequelize) {
  const Session = <SessionStatic>sequelize.define('session', {
    sid: {
      type: STRING,
      primaryKey: true,
    },
    expires: {
      type: DATE,
    },
    data: {
      type: STRING(5000),
    },
  });

  return Session;
}
