"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.Role = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const class_validator_1 = require("class-validator");
var Role;
(function (Role) {
    Role["Guest"] = "guest";
    Role["SubAdmin"] = "sub_admin";
    Role["Admin"] = "admin";
})(Role = exports.Role || (exports.Role = {}));
let User = class User {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "storename", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email address' }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: Role, default: Role.Guest }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true })
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User).plugin(uniqueValidator);
//# sourceMappingURL=user.entity.js.map