import { NextFunction, Request, Response } from "express"
import { IJwtUser } from "../interface/auth.interface"
import notificationsService from "../service/notifications.service"
interface MyRequest extends Request {
    user: IJwtUser
}
class NotificationsController {
    async getList(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const notifications = await notificationsService.getAll(req.user)
            return res.json(notifications)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    async watched(req: MyRequest, res: Response, next: NextFunction) {
        try {
            await notificationsService.watched(req.params.id)
            return res.json({ message: "Прочитано" })
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export default new NotificationsController()