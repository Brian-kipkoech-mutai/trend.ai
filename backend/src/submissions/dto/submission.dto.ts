import { IsString } from 'class-validator';

export class SubmissionDto {
  @IsString()
  contentLink!: string;
  @IsString()
  campaignId!: string;
}
