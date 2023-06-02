import { Controller, Post, Body, Req, Param } from '@nestjs/common';
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
}
