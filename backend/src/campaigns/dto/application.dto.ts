import { IsString } from 'class-validator';

export class ApplicationDto {
  @IsString()
  campaignId: string;

  @IsString()
  contentLink: string;
}
