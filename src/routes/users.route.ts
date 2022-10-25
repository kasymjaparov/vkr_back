import { Router } from 'express';
import userController from '../controller/users.controller'
import checkRole from '../middleware/checkRole.middleware';
import Roles from '../enum/Roles.enum'

const UserRouter = Router()

UserRouter.get('/getUsers', checkRole([Roles.PM]), userController.getAllUsers);
UserRouter.patch('/appoint/:order', checkRole([Roles.PM]), userController.appointToOrder);








export default UserRouter;
