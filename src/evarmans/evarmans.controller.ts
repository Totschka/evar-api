import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EvarmansService } from './evarmans.service';
import { CreateEvarmanDto } from './dto/create-evarman.dto';
import { UpdateEvarmanDto } from './dto/update-evarman.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('evarmans')
@ApiTags('Evarmans')
export class EvarmansController {
  constructor(private readonly evarmansService: EvarmansService) {}

  @Post()
  create(@Body() createEvarmanDto: CreateEvarmanDto) {
    return this.evarmansService.create(createEvarmanDto);
  }

  @Get()
  findAll() {
    return this.evarmansService.findAll();
  }

  @Get(':evarman_id')
  findOne(@Param('evarman_id') evarman_id: number) {
    return this.evarmansService.findOne(evarman_id);
  }

  @Patch(':evarman_id')
  update(
    @Param('evarman_id') evarman_id: number,
    @Body() updateEvarmanDto: UpdateEvarmanDto,
  ) {
    return this.evarmansService.update(evarman_id, updateEvarmanDto);
  }

  @Delete(':evarman_id')
  remove(@Param('evarman_id') evarman_id: number) {
    return this.evarmansService.remove(evarman_id);
  }
}
