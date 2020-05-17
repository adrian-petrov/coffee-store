import { Sequelize, Model, BuildOptions, SMALLINT, STRING } from 'sequelize';

interface CategoryModel extends Model {
  category_id: number;
  category_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type CategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoryModel;
  associate: ({}) => void;
};

export function Category(sequelize: Sequelize) {
  const Category = <CategoryStatic>sequelize.define('category', {
    category_id: {
      type: SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: STRING(50),
      allowNull: false,
    },
  });

  Category.associate = (models: { [key: string]: any }) => {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',
    });
  };

  return Category;
}
