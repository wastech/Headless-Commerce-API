import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/entities/user.entity';
import { IsInt, Min, Max } from 'class-validator';

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ required: true })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @Prop({ required: true })
  productId: string;

  @Prop({ required: true })
  comment: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: User;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
