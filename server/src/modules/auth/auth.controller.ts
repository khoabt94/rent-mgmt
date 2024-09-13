import { Public } from '@decorators/auth.decorator';
import { CurrentUser } from '@decorators/current-user.decorator';
import { LocalAuthGuard } from '@modules/auth/guards/local.guard';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@modules/user/schemas/user.schema';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body)
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() user: User) {
    const access_token = this.authService.generateAccessToken(user)
    return {
      access_token
    }
  }
}
