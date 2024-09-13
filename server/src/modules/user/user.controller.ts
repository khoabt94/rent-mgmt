import { CurrentUser } from '@decorators/current-user.decorator';
import { Serialize } from '@decorators/serialize.decorator';
import { ResponseUserDto } from '@modules/user/dto/user-response.dto';
import { UserService } from '@modules/user/user.service';
import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@modules/user/schemas/user.schema';

@ApiTags('users')
@Controller('user')
@Serialize(ResponseUserDto)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({
    summary: 'Get user info with auth'
  })
  @Get('my-info')
  getMyInfo(@CurrentUser() user: User) {
    return { user }
  }

}
