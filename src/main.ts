import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './custom-validation.pipe';
import { config } from 'dotenv';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  config({ path: 'config.env' });
  const app = await NestFactory.create(AppModule);
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());
  app.useGlobalPipes(new CustomValidationPipe());
  await app.listen(process.env.PORT || 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
