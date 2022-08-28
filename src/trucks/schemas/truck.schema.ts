import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GeoJsonObject } from 'geojson';
import { Document } from 'mongoose';

export type TruckDocument = Truck & Document;

@Schema({ versionKey: false })
export class Truck {
  @Prop({ unique: true, index: true })
  car_number: string;

  @Prop({ required: true, type: Object })
  location: GeoJsonObject;

  @Prop({ required: true })
  max_battery: number;

  @Prop({ required: true })
  curr_battery: number;

  @Prop({ default: 1 })
  status: number;

  @Prop()
  evarman_id: number;
}

export const TruckSchema = SchemaFactory.createForClass(Truck);
TruckSchema.index({ location: '2dsphere' });
