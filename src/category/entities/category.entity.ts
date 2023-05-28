import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

@Schema()
export class Category {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ required: true, unique: true })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @Prop({ type: () => [Subcategory] })
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @Type(() => Subcategory)
  subcategories: Subcategory[];
}

@Schema()
export class Subcategory {
  @Prop({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @Prop({ type: () => [Subcategory] })
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @Type(() => Subcategory)
  subcategories: Subcategory[];
}

export type CategoryDocument = Category & Document;

export const CategorySchema = SchemaFactory.createForClass(Category);
export const SubcategorySchema = SchemaFactory.createForClass(Subcategory);
