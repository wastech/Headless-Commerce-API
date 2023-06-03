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
  Request,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Public } from '../user/decorators/public.decorator';
import { Product } from './entities/product.entity';
import { RolesGuard } from '../user/roles.guard';
import { Role } from '../user/entities/user.entity';
import { Roles } from '../user/decorators/roles.decorator';

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

  //@Public()
  @Patch(':id/update-product')
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin, Role.Guest)
  async updatePost(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: any,
  ) {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException(`Blog post with ID ${id} not found`);
    }

    const user = req.user;
    console.log('object', user);
    // if (
    //   product.createdBy.toString() !== user._id.toString() &&
    //   user.role !== 'admin'
    // ) {
    //   throw new UnauthorizedException(
    //     `You are not authorized to update this post`,
    //   );
    // }

    const updatedProduct = await this.productService.updatePost(
      id,
      updateProductDto,
    );
    return {
      message: `Blog post with ID ${id} updated successfully`,
      post: updatedProduct,
    };
  }

  @Public()
  @Get(':id/similars')
  async findSimilarBlogs(@Param('id') id: string): Promise<Product[]> {
    const product = await this.productService.getProductById(id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const similarBlogs = await this.productService.findSimilarProducts(product);

    return similarBlogs;
  }

  @Public()
  @Get('user/:userId')
  getProductsByUser(@Param('userId') userId: string) {
    return this.productService.getProductsByUser(userId);
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
