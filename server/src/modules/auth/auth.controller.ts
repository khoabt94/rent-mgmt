import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ObjectIdValidationPipe } from 'src/pipes/validation.pipe';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto/index.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  getMyInfo(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('user/:userId')
  updateMyInfo(
    @Param('userId', ObjectIdValidationPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.authService.updateMyInfo(userId, updateUserDto);
  }

}
