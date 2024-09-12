import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpCode } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
  message: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => {
      const statusCode = context.switchToHttp().getResponse().statusCode
      return ({
        data,
        statusCode,
        message: data.message || String(statusCode).startsWith('2') ? 'success' : 'error',
      })
    }));
  }
}