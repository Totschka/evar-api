import { Module } from '@nestjs/common';
import { EvarmansService } from './evarmans.service';
import { EvarmansController } from './evarmans.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evarman, EvarmanSchema } from './schemas/evarman.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Evarman.name, schema: EvarmanSchema }])],
  controllers: [EvarmansController],
  providers: [EvarmansService],
})
export class EvarmansModule {}
