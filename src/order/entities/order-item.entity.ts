import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from '../../product/entities/product.entity';

export type OrderItemDocument = OrderItem & Document;

@Schema()
export class OrderItem {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Product', required: true })
  product: Product;

  @Prop({ type: Number, required: true })
  quantity: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
