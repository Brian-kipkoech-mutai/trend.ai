 import { Injectable, UnauthorizedException } from '@nestjs/common';
 import { InjectModel } from '@nestjs/mongoose';
 import { Model } from 'mongoose';
 import { RegisterDto } from './dto/register.dto';
 import {
   Influencer,
   InfluencerDocument,
 } from 'src/database/schemas/influencer.schema';
 import { Brand, BrandDocument } from 'src/database/schemas/brand.schema';

 @Injectable()
 export class AuthService {
   constructor(
     @InjectModel(Influencer.name)
     private influencerModel: Model<InfluencerDocument>,
     @InjectModel(Brand.name) private brandModel: Model<BrandDocument>,
   ) {}

   async register(registerDto: RegisterDto): Promise<string> {
     const { role, email, password, name } = registerDto;

     if (role === 'influencer') {
       const newInfluencer = new this.influencerModel({
         email,
         password,
         name,
         role,
         socialMediaHandle:"y@brezi"
       });
       const influencer = await newInfluencer.save();
       return influencer.id;
     } else if (role === 'brand') {
       const newBrand = new this.brandModel({
         email,
         password,
         name,
         role,
       });
       const brand = await newBrand.save();
       return brand.id;
     }
     throw new Error('Invalid role');
   }

   async checkUserExists(email: string): Promise<boolean> {
     const influencer = await this.influencerModel.findOne({ email }).exec();
     if (influencer) {
       return true;
     }
     const brand = await this.brandModel.findOne({ email }).exec();
     return !!brand;
   }

   async findInfluencerByEmail(email: string): Promise<any> {
     return this.influencerModel.findOne({ email }).select('+password').exec();
   }

   async findBrandByEmail(email: string): Promise<any> {
     return this.brandModel.findOne({ email }).select('+password').exec();
   }

   async validatePassword(
     password: string,
     role: string,
     email: string,
   ): Promise<boolean> {
     if (role === 'influencer') {
       const influencer = await this.influencerModel
         .findOne({ email })
         .select('+password')
         .exec();
       if (influencer && (await influencer.comparePassword(password))) {
         return true;
       }
     } else if (role === 'brand') {
       const brand = await this.brandModel
         .findOne({ email })
         .select('+password')
         .exec();
       if (brand && (await brand.comparePassword(password))) {
         return true;
       }
     }
     throw new UnauthorizedException('Invalid password');
   }
 }
