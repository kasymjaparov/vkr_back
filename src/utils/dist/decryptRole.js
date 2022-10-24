"use strict";
exports.__esModule = true;
exports.decryptRole = void 0;
var Roles_enum_1 = require("../enum/Roles.enum");
function decryptRole(role) {
    var result = "";
    switch (role) {
        case Roles_enum_1["default"].BUILDER:
            result = "Ремонтник";
            break;
        case Roles_enum_1["default"].DDV:
            result = "ДДВ";
            break;
        case Roles_enum_1["default"].DDV:
            result = "ДДВ";
            break;
        case Roles_enum_1["default"].MEASURE:
            result = "Замерщик";
            break;
        case Roles_enum_1["default"].SUPERADMIN:
            result = "Суперадмин";
            break;
        case Roles_enum_1["default"].PM:
            result = "Пм";
            break;
        default:
            result = "Клиент";
            break;
    }
    return result;
}
exports.decryptRole = decryptRole;
