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
  NotFoundException,
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
  @Get()
  async getAllProducts(
    @Query('page') page: number,
    @Query('limit') limit: number,
    // @Query('sortBy') sortBy: string,
    // @Query('sortOrder') sortOrder: string,
  ) {
    const products = await this.productService.findAll(
      page,
      limit,
      // sortBy,
      // sortOrder,
    );
    return products;
  }

  @Public()
  @Get(':categorySlug')
  async getFilters(
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

    const products = await this.productService.productFilter(
      categorySlug,
      filters,
      page,
      limit,
    );

    return products;
  }

  @Public()
  @Get(':productId/:productSlug')
  async getProductByIdAndSlug(
    @Param('productId') productId: string,
    @Param('productSlug') productSlug: string,
  ) {
    const product = await this.productService.findOneByIdAndSlug(
      productId,
      productSlug,
    );
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<void> {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Product not found');
      }
      throw error;
    }
  }
}
