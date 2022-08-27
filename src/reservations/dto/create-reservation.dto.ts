import { GeoJsonObject } from 'geojson';

export class CreateReservationDto {
  user_id: string;

  charge_amount: number;

  reservation_date: Date;

  location: GeoJsonObject;
}
