import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EvarmanDocument = Evarman & Document;

@Schema({ versionKey: false })
export class Evarman {
  @Prop()
  evarman_id: number;

  @Prop()
  name: string;
}

export const EvarmanSchema = SchemaFactory.createForClass(Evarman);
