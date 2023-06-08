import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderItemDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    createOrder(createOrderDto: CreateOrderDto): Promise<Order>;
    getOrders(page: number, limit: number): Promise<any>;
    deleteOrder(orderId: string, req: any): Promise<void>;
    createOrderItem(orderItemDto: OrderItemDto, orderId: string): Promise<Order>;
    getOrdersByUser(userId: string, page: number, limit: number): Promise<any>;
}
