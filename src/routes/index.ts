import { Router } from 'express';
import AuthRouter from './auth.route'
import OrderRouter from './order.route';

const router = Router();
router.use("/auth", AuthRouter)
router.use("/order", OrderRouter)



export default router;
