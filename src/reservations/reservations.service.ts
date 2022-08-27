import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
    return this.reservationModel.findOneAndUpdate(
      { id: reservation_id },
      updateReservationDto,
      {
        new: true,
      },
    );
  }

  remove(reservation_id: string) {
    return this.reservationModel.findOneAndDelete({
      reservation_id: reservation_id,
    });
  }
}
