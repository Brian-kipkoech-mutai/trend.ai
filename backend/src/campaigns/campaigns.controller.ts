import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CampaignDto } from './dto/campaign.dto';
import { CampaignsService } from './campaigns.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/shared/common/guards/role/role.guard';
import { Roles } from 'src/roles/roles.decorator';

// Define the controller for the campaigns resource.
@Controller('campaigns')
@UseGuards(JwtAuthGuard)
@UseGuards(RoleGuard)
@Roles('brand')
export class CampaignsController {
  constructor(private readonly campaignService: CampaignsService) {}
  @Post()
  async createCampaign(@Body() campaignDto: CampaignDto) {
    this.campaignService.createCampaign(campaignDto);
  }
}
