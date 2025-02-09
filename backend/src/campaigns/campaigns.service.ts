import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Campaign } from 'src/database/schemas/campaign.schema';
import { CampaignDto } from './dto/campaign.dto';

@Injectable()
export class CampaignsService {
  constructor(
    @InjectModel(Campaign.name)
    private campaignModel: Model<Campaign>,
  ) {}

   async createCampaign(campaignDto: CampaignDto) {
    const newCampaign = new this.campaignModel(campaignDto);
    await newCampaign.save();
  }
}
