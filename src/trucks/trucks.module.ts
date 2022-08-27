import { Module } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Truck, TruckSchema } from './schemas/truck.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Truck.name, schema: TruckSchema }])],
  controllers: [TrucksController],
  providers: [TrucksService],
})
export class TrucksModule {}
