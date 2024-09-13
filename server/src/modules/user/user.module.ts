import { Module } from '@nestjs/common';
import { UserService } from '@modules/user/user.service';
import { UserController } from '@modules/user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchemaFactory } from '@modules/user/schemas/user.schema';
import { AuthModule } from '@modules/auth/auth.module';
import { UsersRepository } from '@repositories/users/users.repository';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: UserSchemaFactory,
      }
    ]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UsersRepository
  ],
})
export class UserModule { }
