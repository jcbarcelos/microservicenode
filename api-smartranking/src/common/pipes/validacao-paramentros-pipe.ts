import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ValidationParamentrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    if (!value) {
      throw new BadRequestException(
        `O valor do paramentro "${metadata.data.toUpperCase()}" deve ser informado.`,
      );
    }
    return value;
  }
}
