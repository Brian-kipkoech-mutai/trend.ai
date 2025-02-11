import { Campaign } from './../database/schemas/campaign.schema';

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CampaignDto } from './dto/campaign.dto';
import { CampaignsService } from './campaigns.service';
import { RoleGuard } from 'src/shared/common/guards/role/role.guard';
import { Roles } from 'src/roles/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApplicationDto } from './dto/application.dto';

// Define the controller for the campaigns resource.
@Controller('campaigns')
@UseGuards(AuthGuard('jwt'), RoleGuard)
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService) {}
  @Roles('brand')
  @Post('create')
  async createCampaign(
    @Req() req: Request & AccessToken,
    @Body() campaignDto: CampaignDto,
  ): Promise<void> {
    const brandId = req.user.id;
    this.campaignService.createCampaign({ ...campaignDto, brandId });
  }
  @Roles('brand')
  @Get('brand')
  async getAllBrandCampaigns(
    @Req() req: Request & AccessToken,
  ): Promise<Campaign[] | null> {
    const { id: brandId } = req.user;

    const campaigns = await this.campaignService.getAllBrandCampaigns(brandId);

    return campaigns;
  }
  @Roles('influencer')
  @Get('all')
  async getAllCampaigns(
    @Req() req: Request & AccessToken,
  ): Promise<Campaign[] | null> {
    const { id: influencerId } = req.user;

    const campaigns = await this.campaignService.getAllCampaigns(influencerId);
    return campaigns;
  }

  @Get(':id')
  async getCampaignById(
    @Req() req: Request & AccessToken,
  ): Promise<Campaign | null> {
    const { id } = req.params;
    const { id: userId } = req.user;
    const campaign = await this.campaignService.getCampaignById(id, userId);

    if (campaign) {
      return campaign;
    } else {
      throw new BadRequestException('Campaign not found');
    }
  }
  @Roles('influencer')
  @Post('submit-application')
  async submitApplication(
    @Req() req: Request & AccessToken,
    @Body() applicationDto: ApplicationDto,
    @Res() res: Response,
  ): Promise<void> {
    const { id: influencerId } = req.user;
    await this.campaignService.submitApplication(applicationDto, influencerId);

    res.status(200).json({ message: 'Application submitted' });
  }
}
