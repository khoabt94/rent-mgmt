import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { ResponseUserDto } from './dto/user-response.dto';
import { Serialize } from 'src/decorators/serialize.decorator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Serialize(ResponseUserDto)
  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.userService.create(body)
  }
}
