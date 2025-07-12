import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { ReservationsRepository } from './reservation.repository';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        PORT: Joi.number().required(),
      }),
    }),
  ],
  controllers: [ReservationController],
  providers: [ReservationService, ReservationsRepository],
})
export class ReservationModule {}
