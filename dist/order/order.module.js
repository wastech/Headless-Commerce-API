"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const order_entity_1 = require("./entities/order.entity");
const user_entity_1 = require("../user/entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema },
                { name: order_entity_1.Order.name, schema: order_entity_1.OrderSchema },
                { name: user_entity_1.User.name, schema: user_entity_1.UserSchema },
                { name: order_item_entity_1.OrderItem.name, schema: order_item_entity_1.OrderItemSchema },
            ]),
        ],
        controllers: [order_controller_1.OrderController],
        providers: [order_service_1.OrderService],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map