import { NextFunction, Request, Response, Router } from 'express';
import validate from '../middleware/validator/validator';
import isRightToken from "../middleware/isRightToken"
import orderController from '../controller/order.controller';
import checkRole from '../middleware/checkRole.middleware';
import Roles from '../enum/Roles.enum';
import orderValidator from '../middleware/validator/order.validator';
var multer = require('multer');
var upload = multer({ dest: 'upload/' });

const OrderRouter = Router();
OrderRouter.post('/create', upload.array("files"), checkRole([Roles.CLIENT]), orderController.create);
OrderRouter.get('/getAll', checkRole([Roles.CLIENT]), orderController.getAll);



export default OrderRouter;
