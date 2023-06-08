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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const order_entity_1 = require("./entities/order.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrderService = class OrderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }
    async createOrder(createOrderDto) {
        const createdOrder = new this.orderModel(createOrderDto);
        return createdOrder.save();
    }
    async createOrderItem(orderId, orderItemDto) {
        const order = await this.orderModel.findById(orderId);
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        order.orderItems.push(orderItemDto);
        return order.save();
    }
    async getOrders(page, limit) {
        const startIndex = (page - 1) * limit;
        const totalOrders = await this.orderModel.countDocuments().exec();
        const orders = await this.orderModel
            .find()
            .sort({ createdAt: 'desc' })
            .skip(startIndex)
            .limit(limit)
            .exec();
        const totalPages = Math.ceil(totalOrders / limit);
        const groupedOrders = await this.groupOrdersByDate();
        return {
            orders,
            totalPages,
            groupedOrders,
        };
    }
    async groupOrdersByDate() {
        return this.orderModel
            .aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    sales: { $sum: '$totalPrice' },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: {
                    _id: 1,
                },
            },
        ])
            .exec();
    }
    async getOrdersByUser(userId, page, limit) {
        const startIndex = (page - 1) * limit;
        const totalOrders = await this.orderModel
            .countDocuments({ user: userId })
            .exec();
        const orders = await this.orderModel
            .find({ user: userId })
            .sort({ createdAt: 'desc' })
            .skip(startIndex)
            .limit(limit)
            .exec();
        const totalPages = Math.ceil(totalOrders / limit);
        const groupedOrders = await this.groupOrdersByDate();
        return {
            orders,
            totalPages,
            groupedOrders,
        };
    }
    async deleteOrder(orderId, userId) {
        const order = await this.orderModel.findById(orderId).exec();
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.user.toString() !== userId) {
            throw new common_1.ForbiddenException('You are not authorized to delete this order');
        }
        await this.orderModel.deleteOne({ _id: orderId }).exec();
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map