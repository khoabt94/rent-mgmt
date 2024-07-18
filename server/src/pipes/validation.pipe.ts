import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {
  async transform(value: string) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Not a valid id');
    }
    return value;
  }
}