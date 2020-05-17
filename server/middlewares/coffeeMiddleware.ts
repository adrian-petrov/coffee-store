import { check, body } from 'express-validator';

export function sanitizeCreateCoffeeForm() {
  return [
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('imagePath').notEmpty(),
    check('price').isDecimal().notEmpty(),
    check('discount').optional().isNumeric(),
    check('type').notEmpty(),
    check('country').notEmpty(),
    check('notes').isArray({ min: 1, max: 3 }).notEmpty(),
    // check('roast').isInt({ min: 1, max: 5 }).notEmpty,
    check('flavour').notEmpty(),
  ];
}
