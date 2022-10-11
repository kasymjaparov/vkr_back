import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { IJwtUser } from "../interface/auth.interface"
import authService from "../service/auth.service"
interface MyRequest extends Request {
    user: IJwtUser
}
class AuthController {
    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const request = {
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            const message = await authService.registration(request)
            return res.json(message)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = {
                email: req.body.email,
                password: req.body.password,
                role: 0
            }
            const token = await authService.login(request)
            return res.json(token)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
    async getProfileInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            const user = await authService.getProfileInfo(token)
            return res.json(user)
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
    async changeUserInfo(req: Request, res: Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            const { name, surname, patronymic, phone } = req.body
            const candidate = await authService.getProfileInfo(token)
            const user = await authService.changeUserInfo(candidate as User, name, surname, patronymic, phone)
            return res.json(user)
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
    async createSignature(req: MyRequest, res: Response, next: NextFunction) {
        try {
            const candidate = req.user
            const message = await authService.createSignature(candidate)
            return res.json({ message })
        } catch (error) {
            res.status(505).json({ message: error.message })
        }
    }
}

export default new AuthController()