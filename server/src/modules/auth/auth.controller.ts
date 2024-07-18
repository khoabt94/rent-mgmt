import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ObjectIdValidationPipe } from 'src/pipes/validation.pipe';
import { UpdateUserDto } from './dto/update.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Get('user/:userId')
  getMyInfo(@Param('userId', ObjectIdValidationPipe) userId: string) {
    return this.authService.getMyInfo(userId);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Patch('user/:userId')
  updateMyInfo(
    @Param('userId', ObjectIdValidationPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateMyInfo(userId, updateUserDto);
  }

}
