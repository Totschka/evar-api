import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { constants } from 'src/constants';
import { Truck, TruckDocument } from 'src/trucks/schemas/truck.schema';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name) private reservationModel: Model<ReservationDocument>,
    @InjectModel(Truck.name) private truckModel: Model<TruckDocument>,
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
      updateReservationDto.reservation_status > constants.RESERVATION_STATUS.READY &&
      !updateReservationDto.allocate_truck
    ) {
      throw new HttpException('should allocate specific truck', HttpStatus.BAD_REQUEST);
    }

    if (
      updateReservationDto.reservation_status === constants.RESERVATION_STATUS.READY &&
      !updateReservationDto.allocate_truck
    ) {
      return this.reservationModel
        .findOne({ reservation_id: reservation_id })
        .then((doc) => {
          console.log(doc);
          return this.truckModel.findOneAndUpdate(
            { car_number: doc.allocate_truck },
            { status: constants.TRUCK_STATUS.READY },
          );
        })
        .then(() => {
          console.log(updateReservationDto);
          return this.reservationModel.findOneAndUpdate(
            { reservation_id: reservation_id },
            {
              $set: { updateReservationDto },
              $unset: !updateReservationDto.allocate_truck ? { allocate_truck: '' } : {},
            },
          );
        });
    }

    if (
      updateReservationDto.reservation_status === constants.RESERVATION_STATUS.ALLOCATE ||
      updateReservationDto.reservation_status === constants.RESERVATION_STATUS.CHARGING
    ) {
      return this.reservationModel
        .findOne({ reservation_id: reservation_id })
        .then((doc) => {
          if (doc.allocate_truck && doc.allocate_truck !== updateReservationDto.allocate_truck) {
            return this.truckModel.findOneAndUpdate(
              { car_number: doc.allocate_truck },
              { status: constants.TRUCK_STATUS.READY },
            );
          }
        })
        .then(() => {
          return this.truckModel.findOneAndUpdate(
            { car_number: updateReservationDto.allocate_truck },
            { status: constants.TRUCK_STATUS.ALLOCATE },
          );
        })
        .then(() => {
          return this.reservationModel.findOneAndUpdate({ reservation_id: reservation_id }, updateReservationDto);
        });
    } else if (updateReservationDto.reservation_status === constants.RESERVATION_STATUS.COMPLETE) {
      return this.truckModel
        .findOneAndUpdate(
          { car_number: updateReservationDto.allocate_truck },
          { status: constants.TRUCK_STATUS.READY, $inc: { curr_battery: -updateReservationDto.charge_amount } },
        )
        .then(() => {
          return this.reservationModel.findOneAndUpdate({ reservation_id: reservation_id }, updateReservationDto);
        });
    }

    return this.reservationModel.findOneAndUpdate({ reservation_id: reservation_id }, updateReservationDto);
  }

  remove(reservation_id: string) {
    return this.reservationModel.findOneAndDelete({
      reservation_id: reservation_id,
    });
  }
}
