import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '@modules/auth/interfaces/token-payload';
import { CONFIG_KEY } from '@configs/env.config';
import { UsersRepository } from '@repositories/users/users.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(CONFIG_KEY.JWT).secret,
    });
  }

  async validate(payload: TokenPayload) {
    return this.usersRepository.getOneById(payload.userId)
  }
}