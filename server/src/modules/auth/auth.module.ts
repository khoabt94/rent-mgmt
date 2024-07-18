import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';

@Module({
  imports: [MongooseModule.forFeatureAsync([
    {
      name: User.name,
      useFactory: () => {
        const schema = UserSchema;
        schema.plugin(require('mongoose-unique-validator'));
        return schema;
      },
    }
  ])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
