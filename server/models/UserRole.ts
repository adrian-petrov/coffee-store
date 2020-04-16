import { Sequelize, Model, BuildOptions, INTEGER, STRING } from 'sequelize';

interface UserRoleModel extends Model {
  user_id: number;
  role_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserRoleModel;
  associate: ({}) => void;
};

export const UserRole = (sequelize: Sequelize) => {
  const UserRole = <AdminStatic>sequelize.define('user_role', {
    user_id: {
      type: INTEGER,
      primaryKey: true,
    },
    role_id: {
      type: STRING,
      primaryKey: true,
    },
  });

  // UserRole.associate = (models: { [key: string]: any }) => {
  //   UserRole.belongsTo(models.User, {
  //     foreignKey: {
  //       name: 'user_id',
  //       allowNull: false,
  //     },
  //   });
  //   UserRole.belongsTo(models.Role, {
  //     foreignKey: {
  //       name: 'role_id',
  //       allowNull: false,
  //     },
  //   });
  // };

  return UserRole;
};
