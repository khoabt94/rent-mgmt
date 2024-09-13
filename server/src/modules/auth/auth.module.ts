import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from '@repositories/users/users.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemaFactory } from '@modules/user/schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CONFIG_KEY } from '@configs/env';
import { LocalStrategy } from '@modules/auth/strategies/local.strategies';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategies';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
      }
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { secret, expiresIn } = configService.get(CONFIG_KEY.JWT)
        return ({
          secretOrPrivateKey: secret,
          signOptions: {
            expiresIn,
          },
        })
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersRepository,
    LocalStrategy,
    ConfigService,
    JwtStrategy
  ],
})
export class AuthModule { }
