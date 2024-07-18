import { PickType } from '@nestjs/mapped-types';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { RegisterDto } from './register.dto';

export class UpdateUserDto extends PickType(RegisterDto, ['name', 'avatar'] as const) {


}
