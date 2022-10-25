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
var Roles_enum_1 = require("../enum/Roles.enum");
var Order_1 = require("../entity/Order");
var UserService = /** @class */ (function () {
    function UserService() {
    }
    UserService.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.find({
                                order: { id: "DESC" },
                                where: {
                                    role: typeorm_1.In([Roles_enum_1["default"].BUILDER, Roles_enum_1["default"].DDV, Roles_enum_1["default"].MEASURE])
                                }
                            })];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, users];
                    case 2:
                        error_1 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_1.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.appointToOrder = function (_a) {
        var users = _a.users, order = _a.order;
        return __awaiter(this, void 0, void 0, function () {
            var usersArr_1, userRepository_1, orderRepository, candidate, error_2;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        console.log(users, order);
                        usersArr_1 = [];
                        userRepository_1 = typeorm_1.getRepository(User_1.User);
                        orderRepository = typeorm_1.getRepository(Order_1.Order);
                        users.forEach(function (item) { return __awaiter(_this, void 0, void 0, function () {
                            var user;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, userRepository_1.findOne(item)];
                                    case 1:
                                        user = _a.sent();
                                        usersArr_1.push(user);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, orderRepository.findOne(order)];
                    case 1:
                        candidate = _b.sent();
                        candidate.users = usersArr_1;
                        return [4 /*yield*/, orderRepository.save(candidate)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, { message: "Вы успешно назначили ответственных" }];
                    case 3:
                        error_2 = _b.sent();
                        console.log(error_2.message);
                        throw exceptions_1["default"].Forbidden(error_2.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserService;
}());
exports["default"] = new UserService();
