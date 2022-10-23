import { Router } from 'express';
import orderController from '../controller/order.controller';
import checkRole from '../middleware/checkRole.middleware';
import Roles from '../enum/Roles.enum'
import * as fileUploader from "express-fileupload"

const OrderRouter = Router()
OrderRouter.post('/create', fileUploader({ useTempFiles: true }), checkRole([Roles.CLIENT]), orderController.create);
OrderRouter.get('/getAll', checkRole([Roles.CLIENT]), orderController.getAll);
OrderRouter.get('/getMyOrders', checkRole([Roles.CLIENT]), orderController.getUserOrders);
OrderRouter.get('/getById/:id', checkRole([Roles.CLIENT]), orderController.getById);
OrderRouter.delete('/delete/:id', checkRole([Roles.CLIENT, Roles.PM]), orderController.deleteOrder);






export default OrderRouter;
