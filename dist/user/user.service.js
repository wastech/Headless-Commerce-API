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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose_2 = require("@nestjs/mongoose");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("./entities/user.entity");
const user_entity_2 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.userModel.find().exec();
    }
    async register(createUserDto) {
        if (createUserDto === undefined) {
            throw new Error('createUserDto is undefined');
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        if (createUserDto.password === undefined) {
            throw new Error('password is undefined');
        }
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        if (createUserDto.storename === undefined) {
            throw new Error('storename is undefined');
        }
        const createdUser = new this.userModel(Object.assign(Object.assign({}, createUserDto), { password: hashedPassword }));
        return createdUser.save();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async login(loginUserDto) {
        if (!loginUserDto || !loginUserDto.email || !loginUserDto.password) {
            return null;
        }
        const user = await this.userModel
            .findOne({ email: loginUserDto.email })
            .exec();
        if (!user) {
            return null;
        }
        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isPasswordValid) {
            return null;
        }
        const payload = { name: user.email, sub: user._id };
        const token = await this.jwtService.signAsync(payload);
        return { token, user };
    }
    async findById(_id) {
        const user = await this.userModel.findById(_id);
        return user;
    }
    async updateUser(userId, updateUserDto, user) {
        const allowedUpdates = ['name', 'email', 'storename'];
        const updates = Object.keys(updateUserDto);
        const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
        if (!isValidUpdate) {
            throw new common_1.BadRequestException('Invalid updates!');
        }
        const existingUser = await this.userModel.findById(userId);
        if (!existingUser) {
            throw new common_1.NotFoundException('User not found!');
        }
        if (user.role && existingUser._id.toString() !== user.toString()) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this user');
        }
        updates.forEach((update) => {
            existingUser[update] = updateUserDto[update];
        });
        await existingUser.save();
        return existingUser;
    }
    async updateUserPassword(userId, oldPassword, newPassword) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${userId} not found`);
        }
        const oldPasswordMatches = await bcrypt.compare(oldPassword, user.password);
        if (!oldPasswordMatches) {
            throw new common_1.UnauthorizedException('Invalid old password');
        }
        if (oldPassword === newPassword) {
            throw new common_1.BadRequestException('New password cannot be the same as old password');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, { password: hashedNewPassword }, { new: true });
        return updatedUser;
    }
    async deleteUser(userId, userRole) {
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (userRole !== user_entity_2.Role.Admin && user._id.toString() !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this user');
        }
        return this.userModel.findByIdAndRemove(userId);
    }
    async getUser(id) {
        const user = await this.userModel.findById(id).exec();
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map