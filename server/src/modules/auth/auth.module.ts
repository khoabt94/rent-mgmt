import { CONFIG_KEY } from '@configs/env.config';
import { JwtStrategy } from '@modules/auth/strategies/jwt.strategies';
import { LocalStrategy } from '@modules/auth/strategies/local.strategies';
import { User, UserSchemaFactory } from '@modules/user/schemas/user.schema';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UsersRepository } from '@repositories/users/users.repository';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '@modules/user/user.service';

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
          secret,
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
    JwtStrategy,
  ],
})
export class AuthModule { }
