import {
  Sequelize,
  Model,
  BuildOptions,
  STRING,
  SMALLINT,
  DECIMAL,
} from 'sequelize';

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

export function Product(sequelize: Sequelize) {
  const Product = <ProductStatic>sequelize.define('product', {
    product_id: {
      type: SMALLINT,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: SMALLINT,
      allowNull: false,
    },
    name: {
      type: STRING(100),
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
      type: DECIMAL(4, 2),
      allowNull: false,
    },
    discount: {
      type: SMALLINT,
    },
  });

  Product.associate = function (models: { [key: string]: any }) {
    Product.belongsTo(models.Category, {
      foreignKey: {
        name: 'category_id',
        allowNull: false,
      },
      onDelete: 'SET NULL',
    });
    Product.hasOne(models.ProductCoffee, {
      as: 'ProductCoffee',
      foreignKey: 'product_id',
    });
  };

  return Product;
}
