import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update.dto';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }
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
  async getMyInfo(userId: string) {
    const user = await this.UserModel.findById(userId)
    if (user) return user
    return new NotFoundException('Not found user info')
  }

  async updateMyInfo(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserModel.findByIdAndUpdate(userId, updateUserDto, { new: true })
    if (user) return user
    return new NotFoundException('Not found user info')
  }


}
