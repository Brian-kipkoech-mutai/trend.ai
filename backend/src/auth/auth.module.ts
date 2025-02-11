import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InfluencerSchema } from 'src/database/schemas/influencer.schema';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { RegisterDto } from './dto/register.dto';
import { BrandSchema } from 'src/database/schemas/brand.schema';
import { LoginDto } from './dto/login.dto';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: 'Influencer', schema: InfluencerSchema },
      { name: 'Brand', schema: BrandSchema },
    ]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('appConfig.jwtSecret'),
        signOptions: { expiresIn: '7d' }, // 7 days expiration
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RegisterDto, LoginDto, ],
  exports: [JwtStrategy,PassportModule]
})
export class AuthModule {}
