import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SubcategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  //   @ValidateNested({ each: true })
  //   @ArrayNotEmpty()
  //   @ArrayUnique()
  //   @Type(() => SubcategoryDTO)
  //   subcategories: SubcategoryDTO[];
}

export class CategoryDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @ArrayUnique()
  @Type(() => SubcategoryDTO)
  subcategories: SubcategoryDTO[];
}
