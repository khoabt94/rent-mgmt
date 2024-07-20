import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_KEY } from 'src/constants';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schemas';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(ENV_KEY.JWT_SECRET),
        });
    }

    async validate(payload: any) {
        const user = await this.UserModel.findById(payload.user_id).select('+is_active')
        if (!user || !user.is_active) {
            return new UnauthorizedException('Token không hợp lệ!')
        }
        user.is_active = undefined
        return user
    }
}