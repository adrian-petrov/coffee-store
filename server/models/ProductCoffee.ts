import {
  Sequelize,
  Model,
  BuildOptions,
  INTEGER,
  STRING,
  ARRAY,
} from 'sequelize';

interface ProductCoffeeModel extends Model {
  product_id: number;
  type: string;
  country: string;
  notes: string[];
  roast: number;
  flavour: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ProductCoffeeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductCoffeeModel;
  associate: ({}) => void;
};

export const ProductCoffee = (sequelize: Sequelize) => {
  const ProductCoffee = <ProductCoffeeStatic>sequelize.define(
    'product_coffee',
    {
      product_id: {
        type: INTEGER,
        primaryKey: true,
      },
      type: {
        type: STRING,
        allowNull: false,
      },
      country: {
        type: STRING,
        allowNull: false,
      },
      notes: {
        type: ARRAY(STRING),
        allowNull: false,
      },
      roast: {
        type: INTEGER,
        allowNull: false,
      },
      flavour: {
        type: STRING,
        allowNull: false,
      },
    }
  );

  ProductCoffee.associate = (models: { [key: string]: any }) => {
    ProductCoffee.belongsTo(models.Product, {
      foreignKey: {
        name: 'product_id',
        allowNull: false,
      },
    });
  };

  return ProductCoffee;
};
