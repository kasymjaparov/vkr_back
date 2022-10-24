import Roles from "../enum/Roles.enum";

export function decryptRole(role: Roles) {
    let result = ""
    switch (role) {
        case Roles.BUILDER:
            result = "Ремонтник"
            break;
        case Roles.DDV:
            result = "ДДВ"
            break;
        case Roles.DDV:
            result = "ДДВ"
            break;
        case Roles.MEASURE:
            result = "Замерщик"
            break;
        case Roles.SUPERADMIN:
            result = "Суперадмин"
            break;
        case Roles.PM:
            result = "Пм"
            break;
        default:
            result = "Клиент"
            break;
    }
    return result
}