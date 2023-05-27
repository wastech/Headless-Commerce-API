import { MongooseModule } from '@nestjs/mongoose';

export function mongooseConfig() {
  const mongodbUri = process.env.MONGODB_URL;
  return MongooseModule.forRoot(mongodbUri);
}
