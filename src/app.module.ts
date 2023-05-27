import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { mongooseConfig } from './database/mongoose.config';
import { AnyExceptionFilter } from './http-exception.filter';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { CastErrorFilter } from './cast-error.filter';
import { config } from 'dotenv';
config({ path: 'config.env' });

@Module({
  imports: [mongooseConfig(), UserModule],
  controllers: [AppController],
  providers: [
    AppService,
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
