import { IsString, IsNotEmpty } from 'class-validator';

export class ApplicationDto {
  @IsString()
  @IsNotEmpty()
  campaignId!: string;

  @IsString()
  @IsNotEmpty()
  contentLink!: string;
}
