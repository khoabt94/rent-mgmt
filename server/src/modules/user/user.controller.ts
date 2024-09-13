import { Serialize } from '@decorators/serialize.decorator';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { ResponseUserDto } from '@modules/user/dto/user-response.dto';
import { UserService } from '@modules/user/user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';

@Controller('user')
@Serialize(ResponseUserDto)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('get-my-info/:userId')
  getMyInfo(@Param() userId: string) {
    return this.userService.getUserById(userId)
  }

}
