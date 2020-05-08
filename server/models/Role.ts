import { Sequelize, Model, BuildOptions, INTEGER, STRING } from 'sequelize';

interface RoleModel extends Model {
  role_id: number;
  role_type: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AdminStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RoleModel;
  associate: ({}) => void;
};

export function Role(sequelize: Sequelize) {
  const Role = <AdminStatic>sequelize.define('role', {
    role_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_type: {
      type: STRING,
      allowNull: false,
    },
  });

  Role.associate = function (models: { [key: string]: any }) {
    Role.belongsToMany(models.User, {
      through: 'user_role',
      foreignKey: {
        name: 'role_id',
        allowNull: false,
      },
    });
  };

  return Role;
}
