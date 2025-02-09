// src/campaigns/schemas/campaign.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
@Schema()
export class Campaign extends Document {
  @Prop({ required: true , unique: true})
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;
  
  @Prop({ required: true, type: Types.ObjectId, ref: 'Brand' })
  brandId: string;
}

export const CampaignSchema = SchemaFactory.createForClass(Campaign);
 

  