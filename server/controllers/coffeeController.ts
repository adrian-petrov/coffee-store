import { Request, Response, NextFunction } from 'express';
import models from '../models/index';

// CREATE
export async function createCoffee(req: Request, res: Response) {
  const {
    name,
    description,
    imagePath,
    price,
    discount,
    type,
    country,
    notes,
    roast,
    flavour,
  } = req.body;

  let newProduct;

  try {
    await models.sequelize.transaction(async (t: Function) => {
      newProduct = await models.Product.create(
        {
          category_id: 1,
          name: name,
          description: description,
          image_path: imagePath,
          price: price,
          discount: discount,
        },
        { transaction: t }
      );
      /**
       * belongsTo and hasOne special methods added to instances:
       * instance.getProductCoffee()
       * instance.setProductCoffee()
       * instance.createProductCoffee()
       */
      await newProduct.createProductCoffee(
        {
          type: type,
          country: country,
          notes: notes,
          roast: roast,
          flavour: flavour,
        },
        { transaction: t }
      );
    });
  } catch (err) {
    console.log(err);
    return res.status(501).send('Instance could not be created');
  }
  return res
    .status(200)
    .send({ message: 'Instance created successfully!', body: newProduct });
}

// READ
export async function getCoffee(req: Request, res: Response) {
  const result = await models.Product.findAll({
    include: models.ProductCoffee,
  });

  return res.send(result);
}

// UPDATE
export async function updateCoffee(req: Request, res: Response) {
  const {
    name,
    description,
    imagePath,
    price,
    discount,
    type,
    country,
    notes,
    roast,
    flavour,
  } = req.body;

  const paramId = req.params.id;

  const product = await models.Product.findByPk(paramId, {
    include: {
      model: models.ProductCoffee,
      as: 'ProductCoffee',
    },
  });

  if (!product) {
    throw new Error(`Product with id: ${paramId} could not be found`);
  }

  try {
    await models.sequelize.transaction(async (t: Function) => {
      const updatedProduct = await product.update(
        {
          name: name,
          description: description,
          image_path: imagePath,
          price: price,
          discount: discount,
        },
        { transaction: t }
      );

      await product.ProductCoffee.update(
        {
          type: type,
          country: country,
          notes: notes,
          roast: roast,
          flavour: flavour,
        },
        { transaction: t }
      );

      return res.status(200).send({ updatedProduct });
    });
  } catch (err) {
    console.log(err);
  }
}

// DELETE
export async function deleteCoffee(req: Request, res: Response) {
  const id = JSON.parse(req.params.id);

  const result = await models.Product.destroy({
    where: { product_id: id },
  });

  if (result > 0) {
    return res.status(200).send(`${result} row(s) deleted successfully`);
  }
  return res
    .status(400)
    .send('The parameters provided do not correspond to any existing ids');
}
