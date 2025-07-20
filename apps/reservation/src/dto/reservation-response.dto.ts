import { IsDateString, IsString } from 'class-validator';

export class ReservationResponseDto {
  @IsString()
  _id: string;

  @IsString()
  info: string;

  @IsDateString()
  timestamp: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  userId: string;

  @IsString()
  invoiceId: string;
}
