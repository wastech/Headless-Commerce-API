import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 0 })
  price: number;

  @Prop({ required: true, default: 0 })
  countInStock: number;

  @Prop({ required: true, default: 0 })
  instock: number;

  @Prop({ required: true, default: 0 })
  numReviews: number;

  @Prop({ required: true })
  brand: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  createdBy: User;

  // ... other product fields
}

export const ProductSchema = SchemaFactory.createForClass(Product);
