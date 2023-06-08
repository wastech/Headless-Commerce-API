import { Product } from '../../product/entities/product.entity';
export declare class OrderItemDto {
    product: Product;
    quantity: number;
    image: string;
    name: string;
    price: number;
}
export declare class AddressDto {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}
export declare class CreateOrderDto {
    user: string;
    paymentMethod: string;
    taxPrice: number;
    shippingPrice: number;
    isPaid: boolean;
    paidAt: Date;
    isDelivered: boolean;
    deliveredAt: Date;
    orderItems: OrderItemDto[];
    totalPrice: number;
    shippingAddress: AddressDto;
}
