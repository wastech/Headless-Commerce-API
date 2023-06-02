import {
  Controller,
  Post,
  Body,
  Req,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';
import { Public } from '../user/decorators/public.decorator';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':id/reviews')
  async submitReview(
    @Param('id') productId: string,
    @Body('rating') rating: number,
    @Body('comment') comment: string,
    @Req() req,
  ) {
    const product = await this.reviewService.submitReview(
      productId,
      rating,
      comment,
      req.user,
    );
    return { message: 'Review submitted successfully', product };
  }

  @Delete(':id/reviews')
  async deleteReview(@Param('id') id: string): Promise<void> {
    try {
      await this.reviewService.deleteReview(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Review not found');
      }
      throw error;
    }
  }
}
