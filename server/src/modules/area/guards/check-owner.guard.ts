import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { CollectionService } from '@modules/collection/collection.service';
import { AreaService } from '../area.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly areaService: AreaService
  ) {
  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const areaId = request.params.areaId;
    if (!areaId) return true
    const check = await this.areaService.validateOwner(user._id, areaId)
    if (!check) {
      throw new UnauthorizedException(ERRORS_DICTIONARY.NOT_OWNER_OF_AREA);
    } else return true
  }
}