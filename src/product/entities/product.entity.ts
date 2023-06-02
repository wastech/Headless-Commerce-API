import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { Review } from '../../review/entities/review.entity';
import slugify from 'slugify';
import * as mongoose from 'mongoose';

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

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ required: true })
  brand: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }] })
  reviews: Review[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  createdBy: User;
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
