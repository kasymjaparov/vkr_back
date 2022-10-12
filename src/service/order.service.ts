import * as bcrypt from "bcrypt"
import { getRepository } from "typeorm"
import { User } from "../entity/User"
import generateJwt from "../utils/generateJwt"
import { IJwtUser, IUserProfile } from "../interface/auth.interface"
import ApiError from "../utils/exceptions"
import * as jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid'
import { Order } from "../entity/Order"
import { flatSeries } from "../interface/order.interface"

interface ICreateReq {
    address: string,
    series: flatSeries,
    amount_room: number
}
class OrderService {
    async create(body: ICreateReq, user: IJwtUser) {
        try {
            const userRepository = getRepository(User)
            const orderRepository = getRepository(Order)
            const candidate = await userRepository.findOne({ email: user.email })
            const order = new Order()
            order.address = body.address
            order.amount_room = body.amount_room
            order.series = body.series
            order.user = candidate
            await orderRepository.save(order)
            candidate.orders = [order]
            await userRepository.save(candidate)
            return { message: "Заявка успешно подана" }
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async getAll() {
        try {
            const orderRepository = getRepository(Order)
            const orders = await orderRepository.find({
                relations: ["act", "user"]
            })
            return orders
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }

}

export default new OrderService()