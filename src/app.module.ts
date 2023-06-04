import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { mongooseConfig } from './database/mongoose.config';
import { AnyExceptionFilter } from './http-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CastErrorFilter } from './cast-error.filter';
import { config } from 'dotenv';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ReviewModule } from './review/review.module';
import { OrderModule } from './order/order.module';
config({ path: 'config.env' });

@Module({
  imports: [
    mongooseConfig(),
    UserModule,
    CategoryModule,
    ProductModule,
    ReviewModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UserModule,
    {
      provide: APP_FILTER,
      useClass: AnyExceptionFilter,
    },

    {
      provide: APP_FILTER,
      useClass: CastErrorFilter,
    },
  ],
})
export class AppModule {}
