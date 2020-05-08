import { Sequelize, Model, BuildOptions, INTEGER, STRING } from 'sequelize';
import bcrypt from 'bcrypt';

import models from './index';

interface UserModel extends Model {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
  associate: ({}) => void;
};

export function User(sequelize: Sequelize) {
  const User = <AdminStatic>sequelize.define('user', {
    user_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: STRING,
      allowNull: false,
    },
    last_name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: STRING(5000),
      allowNull: false,
    },
  });

  User.associate = function (models: { [key: string]: any }) {
    User.belongsToMany(models.Role, {
      through: 'user_role',
      foreignKey: {
        name: 'user_id',
      },
    });
  };
  // use prototype to access instance password through 'this'
  User.prototype.comparePassword = function (password: string) {
    return bcrypt.compare(password, this.password);
  };

  return User;
}
