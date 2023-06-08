import { CreateOrderDto, OrderItemDto } from './dto/create-order.dto';
import { Order, OrderDocument } from './entities/order.entity';
import { Model } from 'mongoose';
export declare class OrderService {
    private orderModel;
    constructor(orderModel: Model<OrderDocument>);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    createOrderItem(orderId: string, orderItemDto: OrderItemDto): Promise<Order>;
    getOrders(page: number, limit: number): Promise<any>;
    groupOrdersByDate(): Promise<any>;
    getOrdersByUser(userId: string, page: number, limit: number): Promise<any>;
    deleteOrder(orderId: string, userId: string): Promise<void>;
}
