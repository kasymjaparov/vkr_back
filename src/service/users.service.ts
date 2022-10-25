import { getRepository, In } from "typeorm"
import { User } from "../entity/User"
import ApiError from "../utils/exceptions"
import Roles from "../enum/Roles.enum"
import { Order } from "../entity/Order"
import { OrderStatuses } from "../enum/OrderStatuses"
import { repairType } from "../interface/order.interface"

class UserService {
    async getAll() {
        try {
            const userRepository = getRepository(User)
            const users = await userRepository.find({
                order: { id: "DESC" },
                where: {
                    role: In([Roles.BUILDER, Roles.DDV, Roles.MEASURE]),
                },

            })
            return users
        } catch (error) {
            throw ApiError.Forbidden(error.message)
        }
    }
    async appointToOrder({ users, order, type }: { users: string[], order: string, type: repairType }) {
        try {
            const userRepository = getRepository(User)
            const orderRepository = getRepository(Order)
            const candidate = await orderRepository.findOne(order, { relations: ["users"] })
            users.forEach(async (item) => {
                const user = await userRepository.findOne(item)
                candidate.users.push(user)
            })
            candidate.type = type
            candidate.status = OrderStatuses.APPOINTED
            await orderRepository.save(candidate)
            return { message: "Вы успешно назначили ответственных" }
        } catch (error) {
            console.log(error.message)
            throw ApiError.Forbidden(error.message)
        }
    }
}

export default new UserService()