import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  ParseIntPipe,
  DefaultValuePipe,
  ParseArrayPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '../user/decorators/public.decorator';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto, @Req() req) {
    return this.productService.createProduct(createProductDto, req.user);
  }

  @Public()
  @Get(':categorySlug')
  async getAllProducts(
    @Param('categorySlug') categorySlug: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('brand') brand?: string,
    @Query('rating') rating?: number,
    @Query('createdBy') createdBy?: string,
    @Query('size') size?: string,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    const filters = {
      price: { minPrice, maxPrice },
      brand,
      rating,
      createdBy,
      size,
    };

    const products = await this.productService.findAll(
      categorySlug,
      filters,
      page,
      limit,
    );

    return products;
  }
}
