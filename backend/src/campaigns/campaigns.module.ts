import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CampaignsController } from './campaigns.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignSchema } from 'src/database/schemas/campaign.schema';
import { CampaignDto } from './dto/campaign.dto';
import { AuthModule } from 'src/auth/auth.module';
import { ApplicationDto } from './dto/application.dto';
import { SubmissionSchema } from 'src/database/schemas/submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Campaign', schema: CampaignSchema },
      {
        name: 'Submission',
        schema: SubmissionSchema,
      },
    ]),
    AuthModule,
  ],
  providers: [CampaignsService, CampaignDto, ApplicationDto],
  controllers: [CampaignsController],
})
export class CampaignsModule {}
