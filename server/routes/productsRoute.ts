import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/coffee', (req: Request, res: Response, next: NextFunction) => {
  console.log(`This is the /admin/products/coffee route`);
  res.send('Hello from the /admin/products/coffee route');
});

router.get(
  '/brewing-equipment',
  (req: Request, res: Response, next: NextFunction) => {
    console.log(`This is the /admin/products/brewing-equipment route`);
  }
);

router.get('/gifts', (req: Request, res: Response, next: NextFunction) => {
  console.log(`This is the /admin/products/gifts route`);
});

export default router;
