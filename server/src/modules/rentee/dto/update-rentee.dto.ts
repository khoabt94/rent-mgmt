import { OmitType } from '@nestjs/mapped-types';
import { CreateRenteeDto } from './create-rentee.dto';

export class UpdateRenteeDto extends OmitType(CreateRenteeDto, ['owner'] as const) { }
