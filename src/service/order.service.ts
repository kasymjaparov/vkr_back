import { getConnection, getRepository } from "typeorm"
import { User } from "../entity/User"
import { IJwtUser } from "../interface/auth.interface"
import ApiError from "../utils/exceptions"
import { Order } from "../entity/Order"
import { flatSeries } from "../interface/order.interface"
import { Act } from "../entity/Act"
import { Order_Room } from "../entity/Order_Room"
import cloudinary from "../utils/cloudinary"
import { Order_Image } from "../entity/Order_Image"

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
            await getConnection().transaction(async transactionalEntityManager => {
                const order_images: Order_Image[] = []
                const orderRooms: Order_Room[] = []
                const userRepository = getRepository(User)
                const orderRepository = getRepository(Order)
                const actRepository = getRepository(Act)
                const orderRoomRepository = getRepository(Order_Room)
                const orderImageRepository = getRepository(Order_Image)
                const candidate = await userRepository.findOne({ email: user.email })
                const order = new Order()
                order.address = body.address
                order.amount_room = body.amount_room
                order.series = body.series
                body.rooms.forEach(async (item) => {
                    const orderRoom = new Order_Room()
                    orderRoom.description = item.description
                    orderRoom.name = item.name
                    await orderRoomRepository.save(orderRoom)
                    orderRooms.push(orderRoom)
                })
                order.order_rooms = orderRooms
                order.users = [candidate]
                const act = await actRepository.create({}).save()
                order.act = act
                candidate.orders = [order]
                body.images.forEach(async (item) => {
                    const orderImage = new Order_Image()
                    const { url } = await cloudinary.uploader.upload(item.path, { folder: "images" })
                    orderImage.link = url || "None"
                    orderImage.order = order
                    await orderImageRepository.save(orderImage)
                    order_images.push(orderImage)
                })
                order.order_images = order_images
                await userRepository.save(candidate)
                await orderRepository.save(order)
            })
            return { message: "Заявка успешно подана" }
        } catch (error) {
            throw ApiError.ClientError(error.message)
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