import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ObjectIdValidationPipe } from 'src/pipes/validation.pipe';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto/index.dto';
import { Public, User } from 'src/utils/decorators';
import { UserDocument } from './schemas/user.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('user/:userId')
  getMyInfo(@User() user: UserDocument) {
    return user;
  }

  @Patch('user/:userId/update')
  updateMyInfo(
    @Param('userId', ObjectIdValidationPipe) userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.authService.updateMyInfo(userId, updateUserDto);
  }

  @Patch('user/:userId/inactive')
  inactiveMyAccount(
    @Param('userId', ObjectIdValidationPipe) userId: string,
  ) {
    return this.authService.inactiveMyAccount(userId);
  }

  @Public()
  @Patch('user/:userId/reactive')
  reactiveMyAccount(
    @Param('userId', ObjectIdValidationPipe) userId: string,
  ) {
    return this.authService.reactiveMyAccount(userId);
  }

}
