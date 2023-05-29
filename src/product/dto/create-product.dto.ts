import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  public title: string;

  @IsString()
  public image: string;

  @IsString()
  public description: string;

  @IsNumber()
  public price: number;

  @IsNumber()
  public countInStock: number;

  @IsNumber()
  public instock: number;

  @IsNumber()
  public numReviews: number;

  @IsNumber()
  public category: string;
}
