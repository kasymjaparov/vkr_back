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
var bcrypt = require("bcrypt");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var generateJwt_1 = require("../utils/generateJwt");
var exceptions_1 = require("../utils/exceptions");
var jwt = require("jsonwebtoken");
var uuid_1 = require("uuid");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.registration = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, role, userRepository, candidate, hashPassword, user, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        email = body.email, password = body.password, role = body.role;
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: email })];
                    case 1:
                        candidate = _a.sent();
                        if (candidate) {
                            throw exceptions_1["default"].ClientError("Пользователь с таким email уже существует");
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 5)];
                    case 2:
                        hashPassword = _a.sent();
                        user = new User_1.User();
                        user.email = email;
                        user.role = role;
                        user.password = hashPassword;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Успешно создан аккаунт" }];
                    case 4:
                        error_1 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.login = function (body) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, comparePassword, token, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        email = body.email, password = body.password;
                        return [4 /*yield*/, User_1.User.findOne({ where: { email: email } })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw exceptions_1["default"].ClientError("Пользователь не найден");
                        }
                        comparePassword = bcrypt.compareSync(password, user.password);
                        if (!comparePassword) {
                            throw exceptions_1["default"].ClientError("Указан неверный пароль");
                        }
                        token = generateJwt_1["default"](user.id, user.email, user.role, user.name, user.surname, user.patronymic, user.phone, user.signature);
                        return [2 /*return*/, { token: token }];
                    case 2:
                        error_2 = _a.sent();
                        throw exceptions_1["default"].Forbidden(error_2.message);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.getProfileInfo = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, userRepository, foundUser, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        decoded = jwt.verify(token, process.env.SECRET_KEY);
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: decoded.email })];
                    case 1:
                        foundUser = _a.sent();
                        delete foundUser.password;
                        return [2 /*return*/, foundUser];
                    case 2:
                        error_3 = _a.sent();
                        throw exceptions_1["default"].Forbidden("Ошибка при получении роли");
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.changeUserInfo = function (user, name, surname, patronymic, phone, sign) {
        if (patronymic === void 0) { patronymic = ""; }
        if (sign === void 0) { sign = false; }
        return __awaiter(this, void 0, void 0, function () {
            var userRepository, foundUser, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        userRepository = typeorm_1.getRepository(User_1.User);
                        return [4 /*yield*/, userRepository.findOne({ email: user.email })];
                    case 1:
                        foundUser = _a.sent();
                        foundUser.name = name;
                        foundUser.surname = surname;
                        foundUser.patronymic = patronymic;
                        foundUser.phone = phone;
                        console.log(sign);
                        if (sign) {
                            foundUser.signature = uuid_1.v4();
                        }
                        return [4 /*yield*/, userRepository.save(foundUser)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "Ваши данные успешно изменены"];
                    case 3:
                        error_4 = _a.sent();
                        throw exceptions_1["default"].ClientError("Ошибка при изменении данных пользователя");
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports["default"] = new AuthService();
