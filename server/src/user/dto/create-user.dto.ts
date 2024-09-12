import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @MaxLength(50, { message: 'Tên người dùng không dài quá 50 ký tự' })
  @MinLength(5, { message: 'Tên người dùng phải ít nhất 5 ký tự' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp tên người dùng đăng ký' })
  username: string;

  @IsEmail({}, { message: 'Vui lòng cung cấp email hợp lệ' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp email đăng ký' })
  email: string;

  @Length(6, 6, { message: 'Mật khẩu phải có đúng 6 chữ số' })
  @IsString()
  @IsNotEmpty({ message: 'Vui lòng cung cấp mật khẩu đăng ký' })
  password: string;
}
