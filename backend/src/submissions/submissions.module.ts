import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { SubmissionsController } from './submissions.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubmissionSchema } from 'src/database/schemas/submission.schema';

@Module({
  providers: [SubmissionsService],
  controllers: [SubmissionsController],
  imports: [
    AuthModule,
    MongooseModule.forFeature([
      { name: 'Submission', schema: SubmissionSchema },
    ]),
  ],
})
export class SubmissionsModule {}
