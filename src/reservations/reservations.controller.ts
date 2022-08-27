import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('reservations')
@ApiTags('Reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  create(@Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @Get()
  findAll() {
    return this.reservationsService.findAll();
  }

  @Get(':reservation_id')
  findOne(@Param('reservation_id') reservation_id: string) {
    return this.reservationsService.findOne(reservation_id);
  }

  @Patch(':reservation_id')
  update(@Param('reservation_id') reservation_id: string, @Body() updateReservationDto: UpdateReservationDto) {
    return this.reservationsService.update(reservation_id, updateReservationDto);
  }

  @Delete(':reservation_id')
  remove(@Param('reservation_id') reservation_id: string) {
    return this.reservationsService.remove(reservation_id);
  }
}
