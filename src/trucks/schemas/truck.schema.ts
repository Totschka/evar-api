import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GeoJsonObject } from 'geojson';
import { Document } from 'mongoose';

export type TruckDocument = Truck & Document;

@Schema({ versionKey: false })
export class Truck {
  @Prop()
  car_number: string;

  @Prop({ type: Object })
  location: GeoJsonObject;

  @Prop()
  max_battery: number;

  @Prop()
  curr_battery: number;

  @Prop()
  status: number;

  @Prop()
  evarman_id: number;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
