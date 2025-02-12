import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Submission,
  SubmissionDocument,
} from 'src/database/schemas/submission.schema';
import { ProcessSubmissionDto } from './dto/processSubmission.dto';
import { Campaign } from 'src/interfaces/campaign.interface';
import { Influencer } from 'src/interfaces/influencer.interface';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private submissionModel: Model<SubmissionDocument>,
  ) {}

  async getAllUserSubmissions(userId: string): Promise<Submission[] | null> {
    return this.submissionModel
      .find({ influencerId: userId }, 'createdAt status')
      .populate('campaignId', 'name')
      .exec();
  }

  async getAcceptedSubmissions(userId: string): Promise<Submission[] | null> {
    return this.submissionModel
      .find({ influencerId: userId, status: 'approved' }, 'createdAt  status')
      .populate('campaignId', 'name startDate endDate')
      .exec();
  }

  async getAllSubmissions(): Promise<Submission[] | null> {
    return this.submissionModel
      .find(
        { status: { $nin: ['approved', 'rejected'] } },
        'createdAt  contentLink',
      )
      .populate('campaignId', 'name')
      .populate('influencerId', 'name')
      .exec();
  }

  async processSubmission(
    submissionDto: ProcessSubmissionDto,
  ): Promise<{ campaignName: string; influencerName: string } | void> {
    const { id, action } = submissionDto;
    const submissionData = await this.submissionModel
      .findByIdAndUpdate(
        id,
        {
          status: action,
        },
        { new: true },
      )
      .populate<{ campaignId: Campaign }>('campaignId', 'name')
      .populate<{ influencerId: Influencer }>('influencerId', 'name')
      .exec();

    if (submissionData) {
      const campaignName = submissionData.campaignId.name;
      const influencerName = submissionData.influencerId.name;
      return { campaignName, influencerName };
    }
  }
}
