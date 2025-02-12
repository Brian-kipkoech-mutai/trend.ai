import { IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CampaignDto {
  @IsDate()
  startDate!: Date;

  @IsDate()
  endDate!: Date;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsString()
  @IsNotEmpty()
  brandId!: string;
}
