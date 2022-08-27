import { ApiProperty } from '@nestjs/swagger';
import { GeoJsonObject } from 'geojson';

export class CreateTruckDto {
  @ApiProperty()
  car_number: string;
  location: GeoJsonObject;
  max_battery: number;
  curr_battery: number;
  status: number;
  evarman_id: number;
}
