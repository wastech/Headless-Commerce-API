import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { JwtPayload } from '../user/interfaces/jwt-payload.interface';
import { Category } from '../category/entities/category.entity';
import { Review } from 'src/review/entities/review.entity';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
    @InjectModel(Review.name) private readonly reviewModel: Model<Review>,
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
    page: number,
    limit: number,
    // sortBy: string,
    // sortOrder: string,
  ): Promise<Product[]> {
    // const sortOptions = {};
    // sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const startIndex = (page - 1) * limit;

    const products = await this.productModel
      .find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
      .exec();

    return products;
  }

  async productFilter(
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

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId).exec();
    return product;
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
      .populate('reviews')
      .exec();

    if (!product) {
      throw new NotFoundException('Product not found');
    }
    console.log('product', product);

    return product;
  }

  async findSimilarProducts(product: Product): Promise<Product[]> {
    const similarBlogs = await this.productModel
      .find({
        category: product.category,
        _id: { $ne: product._id }, // exclude the current blog post from the results
      })
      .sort({ createdAt: -1 }) // sort by creation date in descending order
      .limit(3) // limit to a maximum of 3 similar posts
      .exec();

    return similarBlogs;
  }

  async updatePost(
    id: string,
    updateProductDto: Partial<UpdateProductDto>,
  ): Promise<Product> {
    const options = { new: true }; // Return the updated document

    // Check if the title has been updated
    if (updateProductDto.title) {
      // If the title has been updated, generate a new slug based on the updated title
      updateProductDto.slug = slugify(updateProductDto.title, { lower: true });
    }

    return this.productModel
      .findByIdAndUpdate(id, updateProductDto, options)
      .exec();
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = await this.productModel.findByIdAndDelete(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Delete associated reviews
    await this.reviewModel.deleteMany({ productId });
  }
}
