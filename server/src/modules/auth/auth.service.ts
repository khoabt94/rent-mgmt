import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) { }
  async register(registerDto: RegisterDto) {
    return await this.UserModel.create(registerDto)
  }

}
