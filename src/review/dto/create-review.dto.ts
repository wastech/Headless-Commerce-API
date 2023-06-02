import { IsString, IsNumber, IsMongoId } from 'class-validator';

export class CreateReviewDto {
  user: string;

  rating: number;

  @IsString()
  comment: string;
  productId: string;
}
