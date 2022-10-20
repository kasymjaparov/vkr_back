"use strict";
exports.__esModule = true;
var express_1 = require("express");
var order_controller_1 = require("../controller/order.controller");
var checkRole_middleware_1 = require("../middleware/checkRole.middleware");
var Roles_enum_1 = require("../enum/Roles.enum");
var multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
var upload = multer({ storage: storage }).array('array');
var OrderRouter = express_1.Router();
OrderRouter.post('/create', upload, checkRole_middleware_1["default"]([Roles_enum_1["default"].CLIENT]), order_controller_1["default"].create);
OrderRouter.get('/getAll', checkRole_middleware_1["default"]([Roles_enum_1["default"].CLIENT]), order_controller_1["default"].getAll);
OrderRouter.get('/getUserOrders', checkRole_middleware_1["default"]([Roles_enum_1["default"].CLIENT]), order_controller_1["default"].getUserOrders);
exports["default"] = OrderRouter;
