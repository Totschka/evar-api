import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('trucks')
@ApiTags('Truck')
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.trucksService.create(createTruckDto);
  }

  @Get()
  findAll() {
    return this.trucksService.findAll();
  }

  @Get(':car_number')
  findOne(@Param('id') car_number: string) {
    return this.trucksService.findOne(car_number);
  }

  @Get('/near/:lng&:lat')
  findNear(@Param('lng') lng: number, @Param('lat') lat: number) {
    return this.trucksService.findNear([+lng, +lat]);
  }

  @Patch(':car_number')
  update(@Param('car_number') car_number: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.trucksService.update(car_number, updateTruckDto);
  }

  @Delete(':car_number')
  remove(@Param('car_number') car_number: string) {
    return this.trucksService.remove(car_number);
  }
}
