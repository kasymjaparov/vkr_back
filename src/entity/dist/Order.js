"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Order = void 0;
var typeorm_1 = require("typeorm");
var Act_1 = require("./Act");
var User_1 = require("./User");
var Order_Image_1 = require("./Order_Image");
var Order_Room_1 = require("./Order_Room");
var Measurement_1 = require("./Measurement");
var Approval_1 = require("./Approval");
var Stage_1 = require("./Stage");
var Sample_1 = require("./Sample");
var Check_1 = require("./Check");
var Order = /** @class */ (function (_super) {
    __extends(Order, _super);
    function Order() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Order.prototype, "id");
    __decorate([
        typeorm_1.Column({ nullable: false })
    ], Order.prototype, "address");
    __decorate([
        typeorm_1.Column({ nullable: false })
    ], Order.prototype, "series");
    __decorate([
        typeorm_1.Column({ nullable: false })
    ], Order.prototype, "amount_room");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Order.prototype, "type");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Order.prototype, "status");
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Order.prototype, "contract");
    __decorate([
        typeorm_1.Column({ nullable: true, "default": false })
    ], Order.prototype, "contract_signed");
    __decorate([
        typeorm_1.Column({ nullable: true, "default": "" })
    ], Order.prototype, "denied_reason");
    __decorate([
        typeorm_1.CreateDateColumn()
    ], Order.prototype, "created_at");
    __decorate([
        typeorm_1.UpdateDateColumn()
    ], Order.prototype, "updated_at");
    __decorate([
        typeorm_1.OneToOne(function () { return Act_1.Act; }, {
            onDelete: "CASCADE"
        }),
        typeorm_1.JoinColumn()
    ], Order.prototype, "act");
    __decorate([
        typeorm_1.OneToOne(function () { return Measurement_1.Measurement; }, {
            onDelete: "CASCADE"
        }),
        typeorm_1.JoinColumn()
    ], Order.prototype, "measurement");
    __decorate([
        typeorm_1.OneToMany(function () { return Order_Image_1.Order_Image; }, function (order_image) { return order_image.order; }, {
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        })
    ], Order.prototype, "order_images");
    __decorate([
        typeorm_1.OneToMany(function () { return Approval_1.Approval; }, function (approval) { return approval.order; })
    ], Order.prototype, "approvals");
    __decorate([
        typeorm_1.OneToMany(function () { return Stage_1.Stage; }, function (stage) { return stage.order; })
    ], Order.prototype, "stages");
    __decorate([
        typeorm_1.OneToMany(function () { return Order_Room_1.Order_Room; }, function (order_room) { return order_room.order; })
    ], Order.prototype, "order_rooms");
    __decorate([
        typeorm_1.OneToMany(function () { return Check_1.Check; }, function (check) { return check.order; })
    ], Order.prototype, "checks");
    __decorate([
        typeorm_1.OneToMany(function () { return Sample_1.Sample; }, function (sample) { return sample.order; })
    ], Order.prototype, "samples");
    __decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.User; }, function (user) { return user.orders; }),
        typeorm_1.JoinTable()
    ], Order.prototype, "users");
    Order = __decorate([
        typeorm_1.Entity()
    ], Order);
    return Order;
}(typeorm_1.BaseEntity));
exports.Order = Order;
