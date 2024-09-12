import { BadRequestException } from "@nestjs/common";
import { ValidationError } from "class-validator";

export default function ValidationExceptionFactory(validationErrors: ValidationError[] = []) {
  return new BadRequestException(
    Object.values(validationErrors[0].constraints)[0]
  );
}