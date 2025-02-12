// src/submissions/schemas/submission.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Submission extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Campaign', required: true })
  campaignId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Influencer', required: true })
  influencerId!: Types.ObjectId;

  @Prop({ required: true })
  contentLink!: string;

  @Prop({
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
    required: true,
  })
  status!: string;
}

export type SubmissionDocument = Submission & Document;
export const SubmissionSchema = SchemaFactory.createForClass(Submission);
