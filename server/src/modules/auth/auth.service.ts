import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument, UserSchema } from './schemas/user.schemas';
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
      return new BadRequestException('Email đã có người dùng sử dụng')
    }
    const newUser = await this.UserModel.create(registerDto)
    if (newUser) {
      newUser.password = undefined
      return newUser
    }
  }

  async login({ email, password }: LoginDto) {
    const user = await this.UserModel.findOne({ email }).select('+password +is_active')
    if (!user || !(await user.validatePassword(password))) {
      return new UnauthorizedException("Thông tin không hợp lệ")
    }
    if (!user.is_active) {
      return new UnauthorizedException("Tài khoản đã ngưng sử dụng. Vui lòng kích hoạt lại tài khoản!")
    }
    user.password = undefined
    return {
      access_token: this.jwtService.sign({ user_id: user._id, email }),
      user,
    };
  }


  async updateMyInfo(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserModel.findByIdAndUpdate(userId, updateUserDto, { new: true })
    return user
  }

  async inactiveMyAccount(userId: string) {
    await this.UserModel.findByIdAndUpdate(userId, { is_active: false }, { new: true })
    return 'Inactivated!'
  }

  async reactiveMyAccount(userId: string) {
    await this.UserModel.findByIdAndUpdate(userId, { is_active: true }, { new: true })
    return 'Reactivated!'
  }


}
