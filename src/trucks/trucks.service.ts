import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/users/schemas/user.schema';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { Truck } from './schemas/truck.schema';

@Injectable()
export class TrucksService {
  constructor(@InjectModel(Truck.name) private truckModel: Model<UserDocument>) {}

  create(createTruckDto: CreateTruckDto) {
    const createdTruck = new this.truckModel(createTruckDto);
    return createdTruck.save();
  }

  findAll() {
    return this.truckModel.find();
  }

  findOne(car_number: string) {
    return this.truckModel.findOne({ car_number: car_number }).exec();
  }

  update(car_number: string, updateTruckDto: UpdateTruckDto) {
    return this.truckModel.findOneAndUpdate({ car_number: car_number }, updateTruckDto, { new: true });
  }

  remove(car_number: string) {
    return this.truckModel.findOneAndDelete({ car_number: car_number });
  }
}
