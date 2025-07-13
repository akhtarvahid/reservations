import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsRepository } from './reservation.repository';

@Injectable()
export class ReservationService {
  constructor(
    private readonly reservationsRepository: ReservationsRepository,
  ) {}
  async create(createReservationDto: CreateReservationDto, _id: string) {
    return await this.reservationsRepository.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: _id
    });
  }

  async findAll() {
    return (await this.reservationsRepository.find({})).reverse();
  }

  async findOne(_id: string) {
    return this.reservationsRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return this.reservationsRepository.findOneAndDelete({ _id });
  }
}
