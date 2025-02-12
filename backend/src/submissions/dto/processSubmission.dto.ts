import { IsString, IsNotEmpty } from 'class-validator';

export class ProcessSubmissionDto {
  @IsString()
  @IsNotEmpty()
  id!: string;

  @IsString()
  @IsNotEmpty()
  action!: string;
}
