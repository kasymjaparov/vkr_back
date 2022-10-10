import { check } from "express-validator"

class AuthValidator {
    register = [
        check("email").isEmail().withMessage("Неправильный формат почты").trim(),
        check("password").exists().withMessage("Заполните все поля").isLength({ min: 5 }).withMessage("Пароль должен быть минимум 5 символов").trim(),
        check("role").exists().withMessage("Заполните все поля")
    ]
    login = [
        check("email").isEmail().withMessage("Неправильный формат почты").trim(),
        check("password").exists().withMessage("Заполните все поля").isLength({ min: 5 }).withMessage("Пароль должен быть минимум 5 символов").trim(),]
    changeInfo = [
        check("name").exists().withMessage("Заполните поле name").trim(),
        check("surname").exists().withMessage("Заполните поле surname").trim(),
        check("phone").exists().withMessage("Заполните поле phone").trim(),
    ]
}
export default new AuthValidator()