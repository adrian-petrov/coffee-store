import express from 'express';
import { validate } from '../middlewares/commonMiddleware';
import { sanitizeCreateCoffeeForm } from '../middlewares/coffeeMiddleware';
import * as coffeeController from '../controllers/coffeeController';

const router = express.Router();

// Coffee routes
router.post(
  '/coffee/create',
  sanitizeCreateCoffeeForm(),
  validate,
  coffeeController.createCoffee
);

router.get('/coffee/get', coffeeController.getCoffee);

router.put('/coffee/:id/update', coffeeController.updateCoffee);

router.delete('/coffee/:id/delete', coffeeController.deleteCoffee);

// Brewing equipment routes
router.post(
  '/brewing-equipment/create'
  // sanitizeCreateBrewingEquipmentForm(),
  // validate,
  // brewingEquipmentController.createBreqingEquipment
);

// Gifts routes
export default router;
