import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  Injectable,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;

    if (!metatype || !this.shouldValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException(this.buildErrorMessage(errors));
    }

    return value;
  }

  private shouldValidate(metatype: any): boolean {
    const typesToSkip = [String, Boolean, Number, Array, Object];
    return !typesToSkip.includes(metatype);
  }

  private buildErrorMessage(errors: ValidationError[]): string {
    const errorMessages = errors.map((error) => {
      for (const property in error.constraints) {
        if (error.constraints.hasOwnProperty(property)) {
          return error.constraints[property];
        }
      }
    });

    return errorMessages.join(', ');
  }
}
