import { Router } from 'express';
import AuthRouter from './auth.route'
import OrderRouter from './order.route';
import UserRouter from './users.route';


const router = Router();
router.use("/auth", AuthRouter)
router.use("/order", OrderRouter)
router.use("/users", UserRouter)




export default router;
