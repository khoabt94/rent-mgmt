import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { RoomService } from '@modules/room/room.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private readonly roomService: RoomService
  ) {
  }
  async canActivate(
    context: ExecutionContext,
  ) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const roomId = request.params.roomId;
    if (!roomId) return true
    const check = await this.roomService.validateOwner(user._id, roomId)
    if (!check) {
      throw new UnauthorizedException(ERRORS_DICTIONARY.NOT_OWNER_OF_RENTEE);
    } else return true
  }
}