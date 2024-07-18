import { PickType } from '@nestjs/mapped-types';
import { IsString, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsString()
    @MinLength(2, {
        message: 'Name is too short',
    })
    @MaxLength(50, {
        message: 'Name is too long',
    })
    name: string;

    @IsString()
    @IsEmail({}, {
        message: 'Email must be a valid email'
    })
    email: string;

    @IsString()
    @MinLength(2, {
        message: 'Password is too short',
    })
    @MaxLength(6, {
        message: 'Password is too long',
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