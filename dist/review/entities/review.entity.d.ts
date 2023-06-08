import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
export declare class Review extends Document {
    rating: number;
    productId: string;
    comment: string;
    user: User;
}
export declare const ReviewSchema: mongoose.Schema<Review, mongoose.Model<Review, any, any, any, Document<unknown, any, Review> & Omit<Review & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Review, Document<unknown, {}, mongoose.FlatRecord<Review>> & Omit<mongoose.FlatRecord<Review> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
