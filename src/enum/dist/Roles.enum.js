"use strict";
exports.__esModule = true;
/**
*основные роли при авторизации
*@SUPERADMIN 1
*@CLIENT 0
*@DDV 2
*@BUILDER 3
*@MEASURE 4
 */
var Roles;
(function (Roles) {
    Roles[Roles["SUPERADMIN"] = 1] = "SUPERADMIN";
    Roles[Roles["CLIENT"] = 0] = "CLIENT";
    Roles[Roles["DDV"] = 2] = "DDV";
    Roles[Roles["BUILDER"] = 3] = "BUILDER";
    Roles[Roles["MEASURE"] = 4] = "MEASURE";
    Roles[Roles["PM"] = 5] = "PM";
})(Roles || (Roles = {}));
exports["default"] = Roles;
