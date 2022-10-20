import { NextFunction, Request, Response } from "express"
import { IJwtUser } from "../interface/auth.interface"
import orderService, { ICreateReq } from "../service/order.service"
interface MyRequest extends Request {
    user: IJwtUser
}
class OrderController {
    async create(req: MyRequest, res: Response, next: NextFunction) {
        try {
            console.log(req.body, req.files)
            const user = req.user
            const request: ICreateReq = {
                address: req.body.address,
                series: req.body.series,
                amount_room: req.body.amount_room,
                rooms: JSON.parse(req.body.rooms),
                images: req.files
            }
            const message = await orderService.create(request, user)
            return res.json(message)
        } catch (error) {
            console.log(error.message)
            res.status(404).json({ message: error.message })
        }
    }

    async getAll(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const orders = await orderService.getAll()
            return res.json(orders)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }

    async getUserOrders(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const orders = await orderService.getUserOrders(user)
            return res.json(orders)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export default new OrderController()