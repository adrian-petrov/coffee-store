import { Sequelize } from 'sequelize';
import { Category } from './Category';
import { Product } from './Product';
import { ProductCoffee } from './ProductCoffee';
import { User } from './User';
import { Role } from './Role';
import { Session } from './Session';

require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      freezeTableName: true,
      underscored: true,
    },
  }
);

let models: { [key: string]: any } = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  User: User(sequelize),
  Role: Role(sequelize),
  Category: Category(sequelize),
  Product: Product(sequelize),
  ProductCoffee: ProductCoffee(sequelize),
  Session: Session(sequelize),
};

// create associations
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

export default models;
