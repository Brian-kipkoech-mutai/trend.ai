import { IsString, IsDate } from 'class-validator';

export class CampaignDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;

  @IsString()
  name: string;

  @IsString()
  description: string;
}
