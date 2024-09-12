import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.userService.create(body)
  }
}
