import { IsString } from 'class-validator';

export class ProcessSubmissionDto {
  @IsString()
  id: string;
  @IsString()
  action: string;
}
