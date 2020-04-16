import { Sequelize, Model, BuildOptions, INTEGER, STRING } from 'sequelize';

interface ProductModel extends Model {
  product_id: number;
  category_id: number;
  name: string;
  description: string;
  image_path: string;
  price: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductModel;
  associate: ({}) => void;
};

export const Product = (sequelize: Sequelize) => {
  const Product = <ProductStatic>sequelize.define('product', {
    product_id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: INTEGER,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: STRING,
      allowNull: false,
    },
    image_path: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: INTEGER,
      allowNull: false,
    },
    discount: {
      type: INTEGER,
    },
  });

  Product.associate = (models: { [key: string]: any }) => {
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'category_id',
        allowNull: false,
      },
      onDelete: 'SET NULL',
    });
    Product.hasOne(models.ProductCoffee, {
      foreignKey: 'product_id',
    });
  };

  return Product;
};
