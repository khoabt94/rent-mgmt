import { CONFIG_KEY } from '@configs/env.config';
import { ERRORS_DICTIONARY } from '@constraints/error-dictionary.constraint';
import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@modules/user/schemas/user.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '@repositories/users/users.repository';

@Injectable()
export class AuthService {

  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

  async signup(createUserDto: CreateUserDto) {
    const { email } = createUserDto

    const findUser = await this.usersRepository.getOneByQuery({ email })
    if (findUser) {
      throw new BadRequestException(ERRORS_DICTIONARY.EMAIL_EXISTED)
    }

    await this.usersRepository.create(createUserDto);

    return {}
  }

  async validateUser(email: string, password: string): Promise<User> {
    const findUser = await this.usersRepository.getOneByQueryWithPassword({ email })
    if (!findUser || !(await this.usersRepository.comparePasswords(password, findUser.password))) {
      return null
    }
    findUser.password = undefined
    return findUser;
  }

  generateAccessToken(user: User) {
    const { secret, expiresIn } = this.configService.get(CONFIG_KEY.JWT)
    return this.jwtService.sign({ userId: user._id }, {
      secret,
      expiresIn
    });
  }

  async findUserByUserId(userId): Promise<User> {
    return await this.usersRepository.getOneById(userId);
  }
}
