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
import { Act } from "../entity/Act"
import { Order_Room } from "../entity/Order_Room"
import { decryptRole } from "../utils/decryptRole"

export interface ICreateReq {
    address: string,
    series: flatSeries,
    amount_room: number,
    rooms: { name: string, description: string }[],
    images: any
}
class OrderService {
    async create(body: ICreateReq, user: IJwtUser) {
        try {
            // const userRepository = getRepository(User)
            // const orderRepository = getRepository(Order)
            // const actRepository = getRepository(Act)
            // const orderRoomRepository = getRepository(Order_Room)
            // const orderRooms: Order_Room[] = []
            // body.rooms.forEach(async (item) => {
            //     const orderRoom = await orderRoomRepository.create({ name: item.name, description: item.description }).save()
            //     orderRooms.push(orderRoom)
            // })
            // const candidate = await userRepository.findOne({ email: user.email })
            // const order = new Order()
            // order.address = body.address
            // order.amount_room = body.amount_room
            // order.series = body.series
            // order.order_rooms = orderRooms
            // order.users = [candidate]
            // const act = await actRepository.create({}).save()
            // order.act = act
            // await orderRepository.save(order)
            // candidate.orders = [order]
            // await userRepository.save(candidate)
            console.log(body)
            return { message: "Заявка успешно подана" }
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async getAll() {
        try {
            const orderRepository = getRepository(Order)
            const orders = await orderRepository.find({
                relations: ["act", "users", "order_rooms", "order_images", "measurement", "checks", "samples", "stages"],
                order: { id: "DESC" }
            })
            orders.forEach((item) => {
                item.users.forEach((el) => {
                    delete el.password
                })
            })
            return orders
        } catch (error) {

            throw ApiError.Forbidden(error.message)
        }
    }

}

export default new OrderService()