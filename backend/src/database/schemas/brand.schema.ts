// src/brands/schemas/brand.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, CallbackError } from 'mongoose';
import * as argon2 from 'argon2';

export type BrandDocument = Brand &
  Document & {
    comparePassword(candidatePassword: string): Promise<boolean>;
  };

@Schema()
export class Brand extends Document {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  name!: string;

  @Prop()
  description!: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);

BrandSchema.pre<BrandDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await argon2.hash(this.password);
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

BrandSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return argon2.verify(this.password, candidatePassword);
};
