import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration, { CONFIG_KEY } from '@configs/env.config';
import { UserModule } from '@modules/user/user.module';
import { AuthModule } from '@modules/auth/auth.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtGuard } from '@modules/auth/guards/jwt.guard';
import { GlobalExceptionFilter } from '@exception-filters/global-exception.filter';
import { AreaModule } from '@modules/area/area.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const { connection_url, password } = configService.get(CONFIG_KEY.CONFIG_DATABASE)
        return {
          uri: connection_url.replace('<PASSWORD>', password as string) as string,
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    AreaModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule { }
