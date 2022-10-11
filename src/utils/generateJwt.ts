const jwt = require("jsonwebtoken")

const generateJwt = (id, email, role, name, surname, patronymic, phone, signature): { id: number, email: string, role: number, name: string, surname: string, phone: string, signature: string } => {
    return jwt.sign({ id, email, role, name, surname, patronymic, phone, signature }, process.env.SECRET_KEY, {
        expiresIn: "24h",
    })
}
export default generateJwt