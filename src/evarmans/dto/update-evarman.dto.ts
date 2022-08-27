import { PartialType } from '@nestjs/mapped-types';
import { CreateEvarmanDto } from './create-evarman.dto';

export class UpdateEvarmanDto extends PartialType(CreateEvarmanDto) {}
