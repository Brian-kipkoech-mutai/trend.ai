import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignSchema } from 'src/database/schemas/campaign.schema';
import { CampaignDto } from './dto/campaign.dto';
import { RoleGuard } from 'src/shared/common/guards/role/role.guard';
 

 
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema }]),
  ],
  providers: [CampaignsService, CampaignDto, RoleGuard, ],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
