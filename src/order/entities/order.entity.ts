import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { OrderItemDto } from '../dto/create-order.dto';
import * as mongoose from 'mongoose';

export type OrderDocument = Order & Document;
@Schema({ timestamps: true })
export class Address {
  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  zipCode: string;
}

@Schema()
export class OrderItem {
  @Prop({ required: true })
  product: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;

  @Prop({ type: [{ type: Object, ref: 'OrderItemDto' }] })
  orderItems: OrderItemDto[];

  @Prop({ type: String, required: true })
  paymentMethod: string;

  @Prop({ type: Number, default: 0 })
  taxPrice: number;

  @Prop({ type: Number, default: 0 })
  shippingPrice: number;

  @Prop({ type: Boolean, default: false })
  isPaid: boolean;

  @Prop({ type: Date })
  paidAt: Date;

  @Prop({ type: Boolean, default: false })
  isDelivered: boolean;

  @Prop({ type: Date })
  deliveredAt: Date;

  @Prop({ type: Number, required: true })
  totalPrice: number;

  @Prop({ type: Address, required: true })
  shippingAddress: Address;

  // ... additional fields and methods for the Order entity
}

export const OrderSchema = SchemaFactory.createForClass(Order);
