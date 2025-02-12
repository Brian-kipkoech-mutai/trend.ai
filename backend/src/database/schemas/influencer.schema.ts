// src/influencers/schemas/influencer.schema.ts
import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as argon2 from 'argon2';

// Define a type that includes your custom method
export type InfluencerDocument = Influencer &
  Document & {
    comparePassword(candidatePassword: string): Promise<boolean>;
  };

@Schema({ timestamps: true })
export class Influencer {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ default: 0 })
  followerCount!: number;

  @Prop({ required: true, select: false })
  password!: string;

  @Prop()
  niche!: string;

  @Prop()
  socialMediaHandle!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Campaign' }] })
  campaigns!: Types.ObjectId[];
}

// Create the schema using SchemaFactory
export const InfluencerSchema = SchemaFactory.createForClass(Influencer);

// Pre-save hook to hash the password if it has been modified
InfluencerSchema.pre<InfluencerDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await argon2.hash(this.password);
  next();
});

// Attach the custom method to the schema
InfluencerSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return argon2.verify(this.password, candidatePassword);
};
