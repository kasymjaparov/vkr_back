import { getRepository, In } from "typeorm"
import { User } from "../entity/User"
import ApiError from "../utils/exceptions"
import Roles from "../enum/Roles.enum"
import { Order } from "../entity/Order"
import { OrderStatuses } from "../enum/OrderStatuses"
import { repairType } from "../interface/order.interface"
import { IJwtUser } from "../interface/auth.interface"
import { Notification } from "../entity/Notification"

class NotificationsService {
    async getAll(user: IJwtUser) {
        try {
            const userRepository = getRepository(User)
            const notificationsRepository = getRepository(Notification)
            const candidate = await userRepository.findOne(user.id)
            const notifications = await notificationsRepository.find({
                where: {
                    user: candidate,
                    watchced: false
                }
            })
            return notifications
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async watched(id: string) {
        try {
            const notificationsRepository = getRepository(Notification)
            const notification = await notificationsRepository.findOne(id)
            notification.watchced = true
            await notificationsRepository.save(notification)
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
}

export default new NotificationsService()