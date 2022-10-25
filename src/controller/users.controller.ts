import { NextFunction, Request, Response } from "express"
import { IJwtUser } from "../interface/auth.interface"
import userService from "../service/users.service"
interface MyRequest extends Request {
    user: IJwtUser
}
class OrderController {
    async getAllUsers(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const users = await userService.getAll()
            return res.json(users)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    async appointToOrder(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const request = {
                users: req.body.users,
                type: req.body.type,
                order: req.params.order,
            }
            const message = await userService.appointToOrder(request)
            return res.json(message)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export default new OrderController()