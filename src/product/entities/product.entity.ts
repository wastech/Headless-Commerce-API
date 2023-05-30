import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import slugify from 'slugify';
import * as mongoose from 'mongoose';

interface Review {
  user: Types.ObjectId | User;
  comment: string;
}

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: '' })
  slug: string;

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

  // @Prop({
  //   type: MongooseSchema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  // })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  })
  category: Category;

  @Prop({ type: [Object], default: [] })
  reviews: Review[];

  @Prop({ default: 0 })
  rating: number;

  // @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  createdBy: User;

  // ... other product fields
}

const ProductSchema = SchemaFactory.createForClass(Product);
ProductSchema.pre('save', function (next) {
  if (!this.isModified('title')) {
    return next();
  }
  this.slug = slugify(this.title, { lower: true });
  next();
});
export { ProductSchema };
