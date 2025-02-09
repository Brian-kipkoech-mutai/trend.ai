// src/submissions/schemas/submission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
  
@Schema()
export class Submission extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaignId: string;

  @Prop({ type: Types.ObjectId, ref: 'Influencer', required: true })
  influencer: string;

  @Prop()
  contentLink: string;

  @Prop({ enum: ['pending', 'approved', 'rejected'], default: 'pending' })
  status: string;
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);
