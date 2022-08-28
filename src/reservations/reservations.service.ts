import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { constants } from 'src/constants';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  create(createReservationDto: CreateReservationDto) {
    const createdReservation = new this.reservationModel(createReservationDto);
    return createdReservation.save();
  }

  findAll() {
    return this.reservationModel.find();
  }

  findOne(reservation_id: string) {
    return this.reservationModel.findOne({ reservation_id: reservation_id });
  }

  update(reservation_id: string, updateReservationDto: UpdateReservationDto) {
    if (
      updateReservationDto.reservation_status === constants.RESERVATION_STATUS.ALLOCATE &&
      !updateReservationDto.allocate_truck
    ) {
      throw new HttpException('should allocate specific truck', HttpStatus.BAD_REQUEST);
    }

    return this.reservationModel.findOneAndUpdate({ id: reservation_id }, updateReservationDto);
  }

  remove(reservation_id: string) {
    return this.reservationModel.findOneAndDelete({
      reservation_id: reservation_id,
    });
  }
}
