import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import { IJwtUser } from "../interface/auth.interface"

interface MyRequest extends Request {
    user: IJwtUser
}
export default function isRightToken() {
    return function (req: MyRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization
        jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
            if (error) {
                if (error.message.includes("jwt expired")) {
                    return res.status(400).json({
                        message:
                            "Срок действия токена истек.Попробуйте заново войти в свой аккаунт",
                    })
                } else {
                    return res.status(400).json({ message: "Неверный токен" })
                }
            } else {
                req.user = decoded as IJwtUser
                next()
            }
        })
    }
}