import { INestApplication, ValidationPipe } from "@nestjs/common"
import { TransformInterceptor } from "src/interceptors/transform.interceptor";
import ValidationExceptionFactory from "src/interceptors/validation.interceptor";

export default function configApp(app: INestApplication<any>) {
  app.setGlobalPrefix('api/v1')
  app.enableCors();
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    exceptionFactory: ValidationExceptionFactory,
  }))
}