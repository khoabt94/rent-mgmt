import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User as TUser } from '@modules/user/schemas/user.schema';

declare global {
  namespace Express {
    interface Request {
      currentUser?: TUser
    }
  }
}

export const CurrentUser = createParamDecorator(
  (_data: any, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user
  }
)