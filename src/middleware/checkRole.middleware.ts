import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
import Roles from "../enum/Roles.enum"
import { IJwtUser } from "../interface/auth.interface"

interface MyRequest extends Request {
  user: IJwtUser
}
const checkRole = (roles: Roles[]) => {
  return function (req: MyRequest, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization
      if (!token) {
        return res.status(401).json({ message: "Не авторизован" })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY) as IJwtUser
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Нет доступа" })
      }
      req.user = decoded
      next()
    } catch (e) {
      res.status(401).json({ message: "Ошибка при авторизации" })
    }
  }
}
export default checkRole