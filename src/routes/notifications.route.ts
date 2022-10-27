import { Router } from 'express';
import checkRole from '../middleware/checkRole.middleware';
import Roles from '../enum/Roles.enum'
import notificationsController from '../controller/notifications.controller';

const NotificationsRouter = Router()

NotificationsRouter.get('/', checkRole([Roles.PM, Roles.BUILDER, Roles.CLIENT, Roles.MEASURE]), notificationsController.getList);
NotificationsRouter.patch('/:id', checkRole([Roles.PM, Roles.BUILDER, Roles.CLIENT, Roles.MEASURE]), notificationsController.watched);

export default NotificationsRouter;
