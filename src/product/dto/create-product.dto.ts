import {
  IsString,
  IsNumber,
  IsBoolean,
  // IsMongoId,
  ValidateNested,
  IsArray,
  // ArrayNotEmpty,
} from 'class-validator';

class ReviewDto {
  @IsString()
  user: string;
  @IsString()
  comment: string;
}

export class CreateProductDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  numReviews: number;

  @IsBoolean()
  inStock: boolean;

  @IsString()
  image: string;

  createdBy: string;

  @ValidateNested({ each: true })
  @IsArray()
  reviews: ReviewDto[];

  @IsNumber()
  rating: number;
}
