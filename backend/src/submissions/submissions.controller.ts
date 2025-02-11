import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { Submission } from 'src/database/schemas/submission.schema';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/shared/common/guards/role/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { ProcessSubmissionDto } from './dto/processSubmission.dto';
import { ProcessedSubmission } from 'src/interfaces/submission.iterface';
@Controller('submissions')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class SubmissionsController {
  constructor(private readonly submissionService: SubmissionsService) {}
  @Roles('influencer')
  @Get('all-user-submissions')
  async getAllUserSubmissions(
    @Req() req: Request & AccessToken,
  ): Promise<Submission[] | null> {
    const { id: userId } = req.user;

    const submissions =
      await this.submissionService.getAllUserSubmissions(userId);

    return submissions;
  }

  @Roles('influencer')
  @Get('accepted')
  async getAcceptedSubmissions(
    @Req() req: Request & AccessToken,
  ): Promise<Submission[] | null> {
    const { id: userId } = req.user;

    const submissions =
      await this.submissionService.getAcceptedSubmissions(userId);

    return submissions;
  }
  @Roles('brand')
  @Get('all')
  async getAllSubmissions(): Promise<Submission[] | null> {
    const submissions = await this.submissionService.getAllSubmissions();
    return submissions;
  }

  @Roles('brand')
  @Post('process')
  async processSubmission(
    @Req() req: Request & AccessToken,
    @Body() submissionDto: ProcessSubmissionDto,
  ): Promise<ProcessedSubmission> {
    const result =
      await this.submissionService.processSubmission(submissionDto);
    if (!result) {
      throw new Error('Submission processing failed');
    }
    const { campaignName, influencerName }: ProcessedSubmission = result;
    return { campaignName, influencerName, action: submissionDto.action };
  }
}
