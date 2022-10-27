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
import * as path from 'path'
import * as rimraf from "rimraf"
import { OrderStatuses } from "../enum/OrderStatuses"
import { Notification } from "../entity/Notification"
import Roles from "../enum/Roles.enum"
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
                let order_images: Order_Image[] = []
                let orderRooms: Order_Room[] = []
                let newOrders: string[] = []
                const userRepository = getRepository(User)
                const notificationRepository = getRepository(Notification)

                const orderRepository = getRepository(Order)
                const actRepository = getRepository(Act)
                const orderRoomRepository = getRepository(Order_Room)
                const orderImageRepository = getRepository(Order_Image)
                const candidate = await userRepository.findOne({ where: { email: user.email } })
                const pms = await userRepository.find({ where: { role: Roles.PM }, relations: ["notifications"] })
                const pmNotification = new Notification()
                pmNotification.title = "Клиент сделал заказ"
                const candidateOrders = await this.getUserOrders(candidate)
                candidateOrders.forEach((item) => {
                    if (item.status === "new") {
                        newOrders.push("1")
                    }
                })
                if (newOrders.length >= 4) {
                    throw new Error("Количество необработанных заказов больше трех")
                }
                const order = new Order()
                order.address = body.address
                order.amount_room = body.amount_room
                order.series = body.series
                order.status = OrderStatuses.NEW
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
                body.images.images.forEach(async (item) => {
                    const orderImage = new Order_Image()
                    const { url } = await cloudinary.uploader.upload(item.tempFilePath, { folder: "images" })
                    orderImage.link = url || "None"
                    orderImage.order = order
                    await orderImageRepository.save(orderImage)
                    order_images.push(orderImage)
                })
                rimraf(path.basename("../../tmp"), (err) => {
                    if (err) {
                        return console.log("error occurred in deleting directory", err);
                    }
                })
                order.order_images = order_images
                await notificationRepository.save(pmNotification)
                pms.forEach((pm) => {
                    pm.notifications = [pmNotification]
                })
                await userRepository.save(pms)
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
    async getById(id: string) {
        try {
            const orderRepository = getRepository(Order)
            const order = await orderRepository.findOne(id, {
                relations: ["act", "users", "order_rooms", "order_images", "measurement", "checks", "samples", "stages"],
                order: { id: "DESC" },
            })
            order.users.forEach((el) => {
                delete el.password
            })
            return order
        } catch (error) {

            throw ApiError.Forbidden(error.message)
        }
    }
    async getUserOrders(user: IJwtUser) {
        try {
            const orderRepository = getRepository(Order)
            const orders = await orderRepository.createQueryBuilder("order").leftJoinAndSelect("order.users", "user").leftJoinAndSelect("order.act", "act").leftJoinAndSelect("order.order_rooms", "order_rooms").leftJoinAndSelect("order.order_images", "order_images").leftJoinAndSelect("order.measurement", "measurement").leftJoinAndSelect("order.checks", "checks").leftJoinAndSelect("order.samples", "samples").leftJoinAndSelect("order.stages", "stages").orderBy("order.id", "DESC").where("user.id=:id", { id: user.id }).getMany()
            return orders
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async deleteNewOrders(id: string) {
        try {
            const orderRepository = getRepository(Order)
            const candidate = await orderRepository.findOne(id)
            if (candidate.status === "new") {
                const orders = await orderRepository.delete(id)
                return { message: "Заказ удален" }
            }
            else {
                return { message: "Можно удалить только необработанный заказ" }
            }

        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async handleOrder({ type, id, reason, user }: {
        type: string,
        id: string,
        reason: string,
        user: IJwtUser
    }) {
        try {
            const userRepository = getRepository(User)
            const orderRepository = getRepository(Order)
            const notificationRepository = getRepository(Notification)
            const userCandidate = await userRepository.findOne(user.id, {
                relations: ["notifications"]
            })
            const candidate = await orderRepository.findOne(id, { relations: ["users"] })
            candidate.users.push(userCandidate)
            if (type === "denied") {
                candidate.status = OrderStatuses.DENIED
                candidate.denied_reason = reason
            }
            else {
                candidate.status = OrderStatuses.APPROVED
            }
            const notification = new Notification()
            notification.title = "Менеджер обработал вашу заявку"
            notification.description = ""
            await notificationRepository.save(notification)
            const client = candidate.users.find((client) => client.role === Roles.CLIENT)
            client.notifications = [notification]
            await userRepository.save(client)
            await orderRepository.save(candidate)
            return { message: "Заказ обработан" }
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
}

export default new OrderService()