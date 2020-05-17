import {
  Sequelize,
  Model,
  BuildOptions,
  INTEGER,
  STRING,
  SMALLINT,
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

export function ProductCoffee(sequelize: Sequelize) {
  const ProductCoffee = <ProductCoffeeStatic>sequelize.define(
    'product_coffee',
    {
      product_id: {
        type: SMALLINT,
        primaryKey: true,
      },
      type: {
        type: STRING(15),
        allowNull: false,
      },
      country: {
        type: STRING(50),
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

  ProductCoffee.associate = function (models: { [key: string]: any }) {
    ProductCoffee.belongsTo(models.Product, {
      as: 'Product',
      foreignKey: {
        name: 'product_id',
        allowNull: false,
      },
    });
  };

  return ProductCoffee;
}
