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
  @IsNumber()
  rating: number;
}

export class CreateProductDto {
  @IsString()
  category: string;

  @IsString()
  title: string;

  @IsString()
  slug: string;

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

  readonly createdBy: string;

  @ValidateNested({ each: true })
  @IsArray()
  reviews: ReviewDto[];

  @IsNumber()
  rating: number;
}
