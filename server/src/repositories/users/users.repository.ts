import * as bcrypt from 'bcryptjs';
import { UserRepositoryInterface } from "@modules/user/interfaces/user";
import { User } from "@modules/user/schemas/user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { BaseRepositoryAbstract } from "@repositories/base/base.abstract.repository";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository
  extends BaseRepositoryAbstract<User>
  implements UserRepositoryInterface {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async getOneByQueryWithPassword(condition = {}): Promise<User> {
    return await this.userModel
      .findOne(condition)
      .select('+password')
      .exec();
  }


  async comparePasswords(candidate: string, password: string) {
    return await bcrypt.compare(candidate, password)
  }
}