const jwt = require("jsonwebtoken")

const generateJwt = (id, email, role, name, surname, patronymic, phone, uuid): { id: number, email: string, role: number, name: string, surname: string, phone: string, uuid: string } => {
    return jwt.sign({ id, email, role, name, surname, patronymic, phone, uuid }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    })
}
export default generateJwt