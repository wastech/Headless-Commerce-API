import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../category/entities/category.entity';
import { User } from '../../user/entities/user.entity';
import { Review } from '../../review/entities/review.entity';
import * as mongoose from 'mongoose';
export declare class Product extends Document {
    title: string;
    image: string;
    slug: string;
    description: string;
    price: number;
    countInStock: number;
    instock: number;
    reviewCount: number;
    rating: number;
    brand: string;
    reviews: Review[];
    category: Category;
    createdBy: User;
}
declare const ProductSchema: MongooseSchema<Product, mongoose.Model<Product, any, any, any, Document<unknown, any, Product> & Omit<Product & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, Document<unknown, {}, mongoose.FlatRecord<Product>> & Omit<mongoose.FlatRecord<Product> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
export { ProductSchema };
