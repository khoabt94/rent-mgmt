import { PickType } from '@nestjs/mapped-types';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(2, {
        message: 'Tên người dùng quá ngắn',
    })
    @MaxLength(50, {
        message: 'Tên người dùng quá dài',
    })
    name: string;

    @IsString()
    @IsEmail({}, {
        message: 'Vui lòng điền email hợp lệ'
    })
    email: string;

    @IsString()
    @MinLength(2, {
        message: 'Mật khẩu quá ngắn',
    })
    @MaxLength(6, {
        message: 'Mật khẩu quá dài',
    })
    password: string;

    @IsString()
    @IsOptional()
    avatar: string;
}


export class LoginDto extends PickType(RegisterDto, ['email', 'password'] as const) {


}

export class UpdateUserDto extends PickType(RegisterDto, ['name', 'avatar'] as const) {


}