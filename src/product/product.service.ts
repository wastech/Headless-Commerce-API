import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { JwtPayload } from '../user/interfaces/jwt-payload.interface';
import { Category } from '../category/entities/category.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    user: JwtPayload,
  ): Promise<Product> {
    const createdProduct = new this.productModel({
      ...createProductDto,
      createdBy: user._id,
    });

    return createdProduct.save();
  }

  async findAll(
    categorySlug: string,
    filters: {
      price?: { minPrice: number; maxPrice: number };
      brand?: string;
      rating?: number;
      createdBy?: string;
      size?: string;
    },
    page: number,
    limit: number,
  ): Promise<Product[]> {
    const category = await this.categoryModel
      .findOne({ slug: categorySlug })
      .exec();
    if (!category) {
      throw new Error('Category not found');
    }

    const query = {
      category: category._id,
    };

    if (filters.price && filters.price.minPrice && filters.price.maxPrice) {
      query['price'] = {
        $gte: filters.price.minPrice,
        $lte: filters.price.maxPrice,
      };
    }

    if (filters.brand) {
      query['brand'] = filters.brand;
    }

    if (filters.rating) {
      query['rating'] = filters.rating;
    }

    if (filters.createdBy) {
      query['createdBy'] = filters.createdBy;
    }

    if (filters.size) {
      query['size'] = filters.size;
    }

    const startIndex = (page - 1) * limit;

    const products = await this.productModel
      .find(query)
      .skip(startIndex)
      .limit(limit)
      .populate('category', 'name')
      .populate('createdBy', 'name')
      .exec();

    return products;
  }

  async findOneByIdAndSlug(
    productId: string,
    productSlug: string,
  ): Promise<Product> {
    const product = await this.productModel
      .findOne({
        $and: [{ _id: productId }, { slug: productSlug }],
      })
      .populate('category', 'name')
      .populate('createdBy', 'name')
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }
}
