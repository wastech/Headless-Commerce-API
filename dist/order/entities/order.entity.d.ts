import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { OrderItemDto } from '../dto/create-order.dto';
import * as mongoose from 'mongoose';
export type OrderDocument = Order & Document;
export declare class Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}
export declare class OrderItem {
    product: string;
    quantity: number;
    image: string;
    name: string;
    price: number;
}
export declare class Order {
    user: User;
    orderItems: OrderItemDto[];
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
    totalPrice: number;
    shippingAddress: Address;
}
export declare const OrderSchema: MongooseSchema<Order, mongoose.Model<Order, any, any, any, Document<unknown, any, Order> & Omit<Order & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, Document<unknown, {}, mongoose.FlatRecord<Order>> & Omit<mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
