"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var exceptions_1 = require("../utils/exceptions");
var Order_1 = require("../entity/Order");
var Act_1 = require("../entity/Act");
var Order_Room_1 = require("../entity/Order_Room");
var cloudinary_1 = require("../utils/cloudinary");
var Order_Image_1 = require("../entity/Order_Image");
var path = require("path");
var rimraf = require("rimraf");
var OrderStatuses_1 = require("../enum/OrderStatuses");
var OrderService = /** @class */ (function () {
    function OrderService() {
    }
    OrderService.prototype.create = function (body, user) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, typeorm_1.getConnection().transaction(function (transactionalEntityManager) { return __awaiter(_this, void 0, void 0, function () {
                                var order_images, orderRooms, userRepository, orderRepository, actRepository, orderRoomRepository, orderImageRepository, candidate, newOrders, candidateOrders, order, act;
                                var _this = this;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            order_images = [];
                                            orderRooms = [];
                                            userRepository = typeorm_1.getRepository(User_1.User);
                                            orderRepository = typeorm_1.getRepository(Order_1.Order);
                                            actRepository = typeorm_1.getRepository(Act_1.Act);
                                            orderRoomRepository = typeorm_1.getRepository(Order_Room_1.Order_Room);
                                            orderImageRepository = typeorm_1.getRepository(Order_Image_1.Order_Image);
                                            return [4 /*yield*/, userRepository.findOne({ where: { email: user.email } })];
                                        case 1:
                                            candidate = _a.sent();
                                            newOrders = [];
                                            return [4 /*yield*/, this.getUserOrders(candidate)];
                                        case 2:
                                            candidateOrders = _a.sent();
                                            console.log(candidateOrders);
                                            candidateOrders.forEach(function (item) {
                                                if (item.status === "new") {
                                                    newOrders.push("1");
                                                }
                                            });
                                            if (newOrders.length >= 4) {
                                                throw new Error("Количество необработанных заказов больше трех");
                                            }
                                            order = new Order_1.Order();
                                            order.address = body.address;
                                            order.amount_room = body.amount_room;
                                            order.series = body.series;
                                            order.status = OrderStatuses_1.OrderStatuses.NEW;
                                            body.rooms.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                var orderRoom;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            orderRoom = new Order_Room_1.Order_Room();
                                                            orderRoom.description = item.description;
                                                            orderRoom.name = item.name;
                                                            return [4 /*yield*/, orderRoomRepository.save(orderRoom)];
                                                        case 1:
                                                            _a.sent();
                                                            orderRooms.push(orderRoom);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            order.order_rooms = orderRooms;
                                            order.users = [candidate];
                                            return [4 /*yield*/, actRepository.create({}).save()];
                                        case 3:
                                            act = _a.sent();
                                            order.act = act;
                                            candidate.orders = [order];
                                            body.images.images.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                                var orderImage, url;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            orderImage = new Order_Image_1.Order_Image();
                                                            return [4 /*yield*/, cloudinary_1["default"].uploader.upload(item.tempFilePath, { folder: "images" })];
                                                        case 1:
                                                            url = (_a.sent()).url;
                                                            orderImage.link = url || "None";
                                                            orderImage.order = order;
                                                            return [4 /*yield*/, orderImageRepository.save(orderImage)];
                                                        case 2:
                                                            _a.sent();
                                                            order_images.push(orderImage);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); });
                                            rimraf(path.basename("../../tmp"), function (err) {
                                                if (err) {
                                                    return console.log("error occurred in deleting directory", err);
                                                }
                                                console.log("tmp folder Deleted!");
                                            });
                                            order.order_images = order_images;
                                            return [4 /*yield*/, userRepository.save(candidate)];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, orderRepository.save(order)];
                                        case 5:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: "Заявка успешно подана" }];
                    case 2:
                        error_1 = _a.sent();
                        throw exceptions_1["default"].ClientError(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var orderRepository, orders, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.find({
                                relations: ["act", "users", "order_rooms", "order_images", "measurement", "checks", "samples", "stages"],
                                order: { id: "DESC" }
                            })];
                    case 1:
                        orders = _a.sent();
                        orders.forEach(function (item) {
                            item.users.forEach(function (el) {
                                delete el.password;
                            });
                        });
                        return [2 /*return*/, orders];
                    case 2:
                        error_2 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var orderRepository, order, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.findOne(id, {
                                relations: ["act", "users", "order_rooms", "order_images", "measurement", "checks", "samples", "stages"],
                                order: { id: "DESC" }
                            })];
                    case 1:
                        order = _a.sent();
                        order.users.forEach(function (el) {
                            delete el.password;
                        });
                        return [2 /*return*/, order];
                    case 2:
                        error_3 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_3.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.getUserOrders = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var orderRepository, orders, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository.createQueryBuilder("order").leftJoinAndSelect("order.users", "user").leftJoinAndSelect("order.act", "act").leftJoinAndSelect("order.order_rooms", "order_rooms").leftJoinAndSelect("order.order_images", "order_images").leftJoinAndSelect("order.measurement", "measurement").leftJoinAndSelect("order.checks", "checks").leftJoinAndSelect("order.samples", "samples").leftJoinAndSelect("order.stages", "stages").orderBy("order.id", "DESC").where("user.id=:id", { id: user.id }).getMany()];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, orders];
                    case 2:
                        error_4 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_4.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderService.prototype.deleteNewOrders = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var orderRepository, orders, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        return [4 /*yield*/, orderRepository["delete"](id)];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, { message: "Заказ удален" }];
                    case 2:
                        error_5 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_5.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return OrderService;
}());
exports["default"] = new OrderService();
