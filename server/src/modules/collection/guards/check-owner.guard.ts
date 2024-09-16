import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { CollectionService } from '@modules/collection/collection.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly collectionService: CollectionService
  ) {
  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const collectionId = request.params.collectionId;
    if (!collectionId) return true
    const check = await this.collectionService.validateOwner(user._id, collectionId)
    if (!check) {
      throw new UnauthorizedException(ERRORS_DICTIONARY.NOT_OWNER_OF_RENTEE);
    } else return true
  }
}