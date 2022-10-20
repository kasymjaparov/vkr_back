import { Router } from 'express';
import orderController from '../controller/order.controller';
import checkRole from '../middleware/checkRole.middleware';
import Roles from '../enum/Roles.enum'
import * as multer from "multer"
const upload = multer({ dest: '/uploads' })

const OrderRouter = Router();
OrderRouter.post('/create', upload.array('images'), checkRole([Roles.CLIENT]), orderController.create);
OrderRouter.get('/getAll', checkRole([Roles.CLIENT]), orderController.getAll);
OrderRouter.get('/getUserOrders', checkRole([Roles.CLIENT]), orderController.getUserOrders);




export default OrderRouter;
