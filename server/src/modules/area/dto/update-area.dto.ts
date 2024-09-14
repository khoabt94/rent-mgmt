import { OmitType } from '@nestjs/mapped-types';
import { CreateAreaDto } from './create-area.dto';

export class UpdateAreaDto extends OmitType(CreateAreaDto, ['user'] as const) { }
