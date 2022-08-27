import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EvarmansModule } from './evarmans/evarmans.module';
import { TrucksModule } from './trucks/trucks.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DATABASE_CONN),
    EvarmansModule,
    TrucksModule,
    ReservationsModule,
  ],
})
export class AppModule {}
