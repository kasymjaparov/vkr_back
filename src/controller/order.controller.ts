import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { IJwtUser } from "../interface/auth.interface"
import orderService from "../service/order.service"
interface MyRequest extends Request {
    user: IJwtUser
}
class OrderController {
    async create(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const request = {
                address: req.body.address,
                series: req.body.series,
                amount_room: req.body.amount_room,
            }
            const message = await orderService.create(request, user)
            return res.json(message)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await orderService.getAll()
            return res.json(orders)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export default new OrderController()