import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEvarmanDto } from './dto/create-evarman.dto';
import { UpdateEvarmanDto } from './dto/update-evarman.dto';
import { Evarman, EvarmanDocument } from './schemas/evarman.schema';

@Injectable()
export class EvarmansService {
  constructor(
    @InjectModel(Evarman.name)
    private evarmanModel: Model<EvarmanDocument>,
  ) {}

  create(createEvarmanDto: CreateEvarmanDto) {
    const createdEvarman = new this.evarmanModel(createEvarmanDto);
    return createdEvarman.save();
  }

  findAll() {
    return this.evarmanModel.find();
  }

  findOne(evarman_id: number) {
    return this.evarmanModel.findOne({ evarman_id: evarman_id });
  }

  update(evarman_id: number, updateEvarmanDto: UpdateEvarmanDto) {
    return this.evarmanModel.findOneAndUpdate({ evarman_id: evarman_id }, updateEvarmanDto);
  }

  remove(evarman_id: number) {
    return this.evarmanModel.findOneAndDelete({
      evarman_id: evarman_id,
    });
  }
}
