import { Campaign } from './../database/schemas/campaign.schema';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampaignDto } from './dto/campaign.dto';
import { ApplicationDto } from './dto/application.dto';
import { Submission } from 'src/database/schemas/submission.schema';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name)
    private campaignModel: Model<Campaign>,
    @InjectModel(Submission.name)
    private submissionModel: Model<Submission>,
  ) {}

  async createCampaign(campaignDto: CampaignDto) {
    const newCampaign = new this.campaignModel(campaignDto);
    await newCampaign.save();
  }

  async getAllBrandCampaigns(brandId: string): Promise<Campaign[] | null> {
    console.log('brandId', brandId);
    return this.campaignModel
      .find({ brandId }, '_id name createdAt startDate endDate')
      .exec();
  }

  async getAllCampaigns(influencerId: string): Promise<Campaign[] | null> {
    const submittedCampaigns = await this.submissionModel
      .find({ influencerId }, 'campaignId')
      .exec();

    const submittedCampaignIds = submittedCampaigns.map(
      (submission) => submission.campaignId,
    );

    return this.campaignModel
      .find(
        { _id: { $nin: submittedCampaignIds } },
        '_id name createdAt startDate endDate',
      )
      .exec();
  }

  async getCampaignById(id: string, brandId: string): Promise<Campaign | null> {
    const campaign = await this.campaignModel.findById({
      _id: id,
      brandId,
    });
    if (campaign) return campaign;
    else return null;
  }

  async submitApplication(
    applicationDto: ApplicationDto,
    influencerId: string,
  ): Promise<void> {
    const brandId = await this.campaignModel
      .findOne({ _id: applicationDto.campaignId })
      .select('brandId')
      .exec();
    if (!brandId) {
      throw new BadRequestException('Campaign does not exist');
    }

    const existingSubmission = await this.submissionModel
      .findOne({
        campaignId: applicationDto.campaignId,
        influencerId,
      })
      .exec();

    if (existingSubmission) {
      throw new BadRequestException(
        'You have already submitted an application for this campaign check your submissions',
      );
    }

    const newSubmission = new this.submissionModel({
      ...applicationDto,
      influencerId,
      brandId: brandId.brandId,
    });
    await newSubmission.save();
  }
}
