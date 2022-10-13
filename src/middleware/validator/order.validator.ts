import { check } from "express-validator"

class OrderValidator {
    create = [
        check("rooms").exists().withMessage("Заполните все поля"),
        check("address").exists().withMessage("Заполните все поля").trim(),
        check("amount_room").exists().withMessage("Заполните все поля"),
        check("series").exists().withMessage("Заполните все поля"),
    ]
}
export default new OrderValidator()