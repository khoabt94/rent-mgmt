import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { ResponseUserDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto

    const findUser = await this.userModel.findOne({ email })
    if (findUser) {
      throw new BadRequestException('Email đã tồn tại!')
    }

    const createdUser = new this.userModel(createUserDto);
    const user = await createdUser.save();

    return { user }
  }
}
