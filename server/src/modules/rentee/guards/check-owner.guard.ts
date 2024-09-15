import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { RenteeService } from '@modules/rentee/rentee.service';
import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly renteeService: RenteeService
  ) {
  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const renteeId = request.params.renteeId;
    if (!renteeId) return true
    const check = await this.renteeService.validateOwner(user._id, renteeId)
    if (!check) {
      throw new UnauthorizedException(ERRORS_DICTIONARY.NOT_OWNER_OF_RENTEE);
    } else return true
  }
}