import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignSchema } from 'src/database/schemas/campaign.schema';
import { CampaignDto } from './dto/campaign.dto';
import { RoleGuard } from 'src/shared/common/guards/role/role.guard';
import { AuthModule } from 'src/auth/auth.module';
 

 
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Campaign', schema: CampaignSchema }]),
    AuthModule,
  ],
  providers: [CampaignsService, CampaignDto, RoleGuard ],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
