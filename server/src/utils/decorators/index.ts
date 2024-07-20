
import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const User = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);