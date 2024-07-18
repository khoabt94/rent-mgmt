import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { LoginDto, RegisterDto, UpdateUserDto } from './dto/index.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService
  ) { }
  async register(registerDto: RegisterDto) {
    const checkEmailExist = await this.UserModel.findOne({ email: registerDto.email })
    if (checkEmailExist) {
      return new BadRequestException('Email already taken')
    }
    const newUser = await this.UserModel.create(registerDto)
    if (newUser) {
      newUser.password = undefined
      return newUser
    }
  }

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  async login({ email, password }: LoginDto) {
    const user = await this.UserModel.findOne({ email }).select('+password')
    if (!user || !(await user.validatePassword(password))) {
      return new UnauthorizedException("Invalids credentials")
    }
    user.password = undefined
    return {
      access_token: this.jwtService.sign({ user_id: user._id, email }),
      user,
    };
  }


  async updateMyInfo(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserModel.findByIdAndUpdate(userId, updateUserDto, { new: true })
    if (user) return user
    return new NotFoundException('Not found user info')
  }


}
