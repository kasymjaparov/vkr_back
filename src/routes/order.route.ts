import { Router } from 'express';
import orderController from '../controller/order.controller';
import checkRole from '../middleware/checkRole.middleware';
import Roles from '../enum/Roles.enum';
const multer = require('multer')
const upload = multer({ dest: "/uploads" })

const OrderRouter = Router();
OrderRouter.post('/create', upload.array('images'), checkRole([Roles.CLIENT]), orderController.create);
OrderRouter.get('/getAll', checkRole([Roles.CLIENT]), orderController.getAll);



export default OrderRouter;
